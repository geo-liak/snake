(function () {



    // create variables
    let dimensions = {
        rows: 20,
        columns: 40
    };
    let apple = {
        row: this.row,
        column: this.column
    };
    let activeBlock = {
        row: this.row,
        column: this.column
    };

    let direction = "right";
    let snake = [];
    console.log("snake: " + snake.length);

    // "source" is an object which acts as a source of coordinates, like activeBlock
    function coordinates(source) {
        this.row = source.row;
        this.column = source.column;
    }


    createBoard(dimensions.rows, dimensions.columns);
    determineNewActiveBlockPosition();
    determineNewApplePosition();



    // functions
    //
    //

    // This function changes the state of a block by replacing its classes.
    // The classes are determined by the arguments "fromState" and "toState".
    //
    // The position of the desired block to be changed is determined by the argument "coordinates"
    // which should take an object with the coordinates (row and column).
    function changeBlockState(coordinates, fromState, toState) {
        document.getElementById((coordinates.row) + "-" + (coordinates.column)).classList.replace(fromState, toState);
    }


    // In argument "action", expected value is string "grow" if the snake
    // is about to grow. In every other case, it is omitted. It's like overloading
    // the function.
    function maintainSnake(coordinates, action) {
        console.clear();
        if (action === "grow") {
            snake.unshift(coordinates);
            changeBlockState(snake[0], "empty", "green")
            console.log(snake);
        } else {
            snake.unshift(coordinates);
            changeBlockState(snake[0], "empty", "green")

            let removedCoordinates = snake.pop();
            changeBlockState(removedCoordinates, "green", "empty");

            console.log(snake);
        }
    }

    function determineNewActiveBlockPosition() {
        if (activeBlock.row == null || activeBlock.column == null) {
            // Set new coordinates
            activeBlock.column = Math.floor(Math.random() * dimensions.columns);
            activeBlock.row = Math.floor(Math.random() * dimensions.rows);
            maintainSnake(new coordinates(activeBlock), "grow");
        } else {
            if (direction === "right") {
                activeBlock.column += 1;
            } else if (direction === "down") {
                activeBlock.row += 1;
            } else if (direction === "left") {
                activeBlock.column -= 1;
            } else if (direction === "up") {
                activeBlock.row -= 1;
            }
            
            if (activeBlock.row === apple.row && activeBlock.column === apple.column) {
                determineNewApplePosition();
                changeBlockState(activeBlock, "empty", "green");
                maintainSnake(new coordinates(activeBlock), "grow");
            } else {

                maintainSnake(new coordinates(activeBlock));
            }


            }

        }


        function determineNewApplePosition() {
            // if apple coordinates have been set, change current state from "apple" to "empty".
            if (apple.row != null || apple.column != null) {
                changeBlockState(apple, "red", "empty");
            }

            // Set new coordinates
            do {
                apple.column = Math.floor(Math.random() * dimensions.columns);
                apple.row = Math.floor(Math.random() * dimensions.rows);
            } while (apple.column == activeBlock.column && apple.row == activeBlock.row);

            // Apply the new coordinates
            changeBlockState(apple, "empty", "red");
        }


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

            console.log(document.body.innerHTML);
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

            determineNewActiveBlockPosition();
        }



    }) ();