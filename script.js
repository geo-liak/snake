(function () {


    /**
     * contains the dimensions of the game board
     * @var dimensions
     */
    let dimensions = {
        rows: 10,
        columns: 10
    };
    let apple = {
        row: this.row,
        column: this.column
    };
    let activeBlock = {
        row: this.row,
        column: this.column
    };
    let exec;
    let timeInterval = 150;
    let direction;
    let snake = [];

    /**
     * @param {*} source Is an object which acts as a source of coordinates, like activeBlock
     */
    function coordinates(source) {
        this.row = source.row;
        this.column = source.column;
    }


    createBoard(dimensions.rows, dimensions.columns);
    determineNewActiveBlockPosition();
    determineNewApplePosition();
    execute();

    function execute() {
        exec = setInterval(determineNewActiveBlockPosition, timeInterval);
        // requestAnimationFrame
    }

    function stopExecution() {
        clearInterval(exec);
    }

    function speed() {
        if ((snake.length % 2) === 0) {
            timeInterval = Math.ceil((timeInterval * 0.9));
        }
    }


    // functions
    //
    //
    /**
     * This function changes the state of a block by replacing its classes.
     * The classes are determined by the arguments "fromState" and "toState".
     * @param {*} coordinates The position of the desired block to be changed is 
     * determined by the argument "coordinates" which should take an object with 
     * the coordinates (row and column).
     * @param {string} fromState The class which is going to be replaced.
     * @param {string} toState The target class.
     */
    function changeBlockState(coordinates, fromState, toState) {
        document.getElementById((coordinates.row) + "-" + (coordinates.column)).classList.replace(fromState, toState);
    }

    /**
     * Maintaines the array of the snake. Adds at the beginning of the array the current position and 
     * removes from the end of the array the position which is not needed any more.
     * @param {*} coordinates Gets an object which contains coordinates (number of row and column)
     * @param {string} action In argument "action", expected value is string "grow" if the snake
     * is about to grow. In every other case, it is omitted. It's like overloading
     * the function.
     */
    function maintainSnake(coordinates, action) {
        if (action === "grow") {
            snake.unshift(coordinates);
            changeBlockState(snake[0], "empty", "green")
            // clearInterval(exec);
            // speed();
            // execute();
        } else {
            if (snake.length === 1) {
                snake.unshift(coordinates);
                let removedCoordinates = snake.pop();
                changeBlockState(removedCoordinates, "green", "empty");
                changeBlockState(snake[0], "empty", "green")
            } else {
                snake.unshift(coordinates);
                changeBlockState(snake[0], "empty", "green")

                let removedCoordinates = snake.pop();
                changeBlockState(removedCoordinates, "green", "empty");
            }
        }
    }
    /** 
     * Determines the next active position based of the direction
     */
    function determineNewActiveBlockPosition() {
        if (activeBlock.row == null || activeBlock.column == null) {
            // Set new coordinates
            activeBlock.column = Math.floor(Math.random() * dimensions.columns);
            activeBlock.row = Math.floor(Math.random() * dimensions.rows);
            maintainSnake(new coordinates(activeBlock), "grow");
        } else {
            if (direction === null) {
                changeBlockState(activeBlock, "empty", "green")
            } else if (direction === "right") {
                activeBlock.column++;
            } else if (direction === "down") {
                activeBlock.row++;
            } else if (direction === "left") {
                activeBlock.column--;
            } else if (direction === "up") {
                activeBlock.row--;
            }

            checkGameOver();

            if (activeBlock.row === apple.row && activeBlock.column === apple.column) {
                determineNewApplePosition();
                changeBlockState(activeBlock, "empty", "green");
                maintainSnake(new coordinates(activeBlock), "grow");
            } else {
                maintainSnake(new coordinates(activeBlock));
            }
        }
    }

    /**
     * Checks if the active block is already occupied by the snake (has the "green" class).
     * @param block An object with coordinates.
     */
    function isOccupiedBySnake(block) {
        if (document.getElementById(block.row + "-" + block.column).classList.contains("green")) {
            return true;
        }
    }

    /**
     * Evaluates the game conditions and declares "Game Over".
     */
    function checkGameOver() {
        // Snake goes beyond board.
        if (activeBlock.row > (dimensions.rows - 1) || activeBlock.row < 0 || activeBlock.column > (dimensions.columns - 1) || activeBlock.column < 0) {
            stopExecution();
            alert("Game Over");
        }

        // Snake goes to a block which is already occuppied by itself.
        if (isOccupiedBySnake(activeBlock) && snake.length > 1) {
            stopExecution();
            alert("You bit yourself! Game Over!");
        }


    }


    function determineNewApplePosition() {
        // if apple coordinates have been set, change current state from "apple" to "empty".
        if (apple.row != null || apple.column != null) {
            changeBlockState(apple, "red", "empty");
        }

        // Set new coordinates
        let oldApplePosition = {
            row: apple.row,
            column: apple.column
        };

        //  Determine new position if the snake already occupies this block or if the new position is the same as the current position.
        do {
            apple.column = Math.floor(Math.random() * dimensions.columns);
            apple.row = Math.floor(Math.random() * dimensions.rows);
        } while (isOccupiedBySnake(apple) || (apple.column === oldApplePosition.column && apple.row === oldApplePosition.row));

        // Apply the new coordinates
        changeBlockState(apple, "empty", "red");
    }

    /**
     * Creates the game board
     * @param {int} rows The number of rows of the board
     * @param {Integer} columns The number of columns of the board
     */
    function createBoard(rows, columns) {
        document.body.innerHTML += "\n\n";
        for (let i = 0; i < rows; i++) {
            let newElement = document.createElement("div");
            newElement.setAttribute("id", "row" + i);
            document.body.appendChild(newElement);
            document.getElementById("row" + i).innerHTML += "\n"

            for (let j = 0; j < columns; j++) {
                newElement = document.createElement("div");
                newElement.setAttribute("class", "block empty");
                // set id name: "row - column"
                newElement.setAttribute("id", i + "-" + j);
                document.getElementById("row" + i).appendChild(newElement);
                document.getElementById("row" + i).innerHTML += "\n"
            }
            document.body.innerHTML += "\n\n";
        }

        // console.log(document.body.innerHTML);
    }


    // determine which arrow key is pressed and store info in variable 'direction'
    // prevents snake from going on the opposite direction, like passing over itself.
    document.onkeydown = function (e) {
        if (e.keyCode == 37) {
            if (direction != "right") {
                direction = "left";
            }
        } else if (e.keyCode == 38) {
            if (direction != "down") {
                direction = "up";
            }
        } else if (e.keyCode == 39) {
            if (direction != "left") {
                direction = "right";
            }
        } else if (e.keyCode == 40) {
            if (direction != "up") {
                direction = "down";
            }
        }
    }



})();