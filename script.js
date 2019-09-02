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


    function coordinates(row, column) {
        this.row = row;
        this.column = column;
    }


    let direction = "right";
    let snake = [];
    console.log("snake: " + snake.length);




    // table is a two-dimensional array that stores the state of each block.
    // board is what is shown in the browser window.
    // 
    // createTable(dimensions.rows, dimensions.columns);
    createBoard(dimensions.rows, dimensions.columns);
    determineNewActiveBlockPosition();
    determineNewApplePosition();
    


    // functions
    //
    //

    // This function changes the state of a block by replacing its classes.
    // the classes are determined by the arguments "fromState" and "toState".
    //
    // The position of the desired block to be changed is determined by the argument "coordinates"
    // which should take an object with the coordinates (row and column).
    // 
    // If we need to change a different block based on the coordinates object we use the arguments
    // "rowOffset" and "columnOffset" that are added on the coordinates of the object.
    function changeBlockState(coordinates, rowOffset, columnOffset, fromState, toState) {
        document.getElementById((coordinates.row + rowOffset) + "-" + (coordinates.column + columnOffset)).classList.replace(fromState, toState);
    }


    // In argument "action", expected value is string "grow" if the snake
    // is about to grow. In every other case is omitted.
    function maintainSnake(coordinates, action) {
        console.clear();
        if (action === "grow") {
            snake.unshift(coordinates);
            changeBlockState(snake[0], 0, 0, "empty", "green")
            console.log(snake);
        } else {
            snake.unshift(coordinates);
            changeBlockState(snake[0], 0, 0, "empty", "green")

            let removedCoordinates = snake.pop();
            snake.push();
            changeBlockState(removedCoordinates, 0, 0, "green", "last");

            console.log(snake);
        }
    }



    function determineNewActiveBlockPosition() {
        if (activeBlock.row == null || activeBlock.column == null) {
            // Set new coordinates
            activeBlock.column = Math.floor(Math.random() * dimensions.columns);
            activeBlock.row = Math.floor(Math.random() * dimensions.rows);
            maintainSnake(activeBlock, "grow");
            // changeBlockState(activeBlock, 0, 0, "empty", "green");
        } else if (direction === "right") {
            activeBlock.column += 1;
        } else if (direction === "down") {
            activeBlock.row += 1;
        } else if (direction === "left") {
            activeBlock.column -= 1;
        } else if (direction === "up") {
            activeBlock.row -= 1;
        }

        maintainSnake(activeBlock);


        if (activeBlock.row == apple.row && activeBlock.column == apple.column) {
            determineNewApplePosition();
            changeBlockState(activeBlock, 0, 0, "empty", "green");
            maintainSnake(activeBlock, "grow");
        }

    }


    function determineNewApplePosition() {
        // if apple coordinates have been set, change current state from "apple" to "empty".
        if (apple.row != null || apple.column != null) {
            changeBlockState(apple, 0, 0, "red", "empty");
        }

        // Set new coordinates
        do {
            apple.column = Math.floor(Math.random() * dimensions.columns);
            apple.row = Math.floor(Math.random() * dimensions.rows);
        } while (apple.column == activeBlock.column && apple.row == activeBlock.row);

        // Apply the new coordinates
        changeBlockState(apple, 0, 0, "empty", "red");
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


    // function createTable(rows, columns) {
    //     //rows
    //     table = new Array(rows);
    //     //columns
    //     for (let i = 0; i < rows; i++) {
    //         table[i] = new Array(columns);
    //         for (let j = 0; j < columns; j++) {
    //             table[i][j] = "empty";
    //         }
    //     }
    // }


    // determine which arrow key is pressed and store info in variable 'direction'
    document.onkeydown = function (e) {
        if (e.keyCode == 37) {
            direction = "left";
        } else if (e.keyCode == 38) {
            direction = "up";
        } else if (e.keyCode == 39) {
            direction = "right";
        } else if (e.keyCode == 40) {
            direction = "down";
        }

        determineNewActiveBlockPosition();
    }



})();