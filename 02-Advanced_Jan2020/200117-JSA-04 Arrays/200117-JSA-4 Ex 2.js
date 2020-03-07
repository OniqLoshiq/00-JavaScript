//01 Print an Array with a Given Delimiter
function printArray(input) {
    let delimer = input.pop();
    console.log(input.join(delimer));
}

printArray(['How about no?', 'I', 'will', 'not', 'do', 'it!', '_']);

//02 Print Every N-th Element from an Array
function printNElementArray(input) {
    let step = +input.pop();

    for (let i = 0; i < input.length; i += step) {
        console.log(input[i]);
    }
}

printNElementArray(['5', '20', '31', '4', '20', '2']);

//03 Add and Remove elements from an Array
function addAndRemoveElements(input) {
    const commandsMap = {
        "add": (num, arr) => arr.push(num),
        "remove": (num, arr) => arr.pop(),
    };

    // let initialNum = 1;
    // let result = [];

    // for (let i = 0; i < input.length; i++) {
    //     commandsMap[input[i]](initialNum, result);
    //     initialNum++;
    // }

    let initialNum = 0;

    let result = input.reduce((acc, x) => {
        initialNum++;
        commandsMap[x](initialNum, acc);
        return acc;
    }, []);

    console.log(result.length > 0 ? result.join("\n") : "Empty");
}

addAndRemoveElements(['add', 'add', 'remove', 'add', 'add']);

//04 Rotate Array
function rotateArray(input) {
    let rotations = +input.pop() % input.length;

    for (let i = 0; i < rotations; i++) {
        let elementToRotate = input.pop();
        input.unshift(elementToRotate);
    }

    console.log(input.join(" "));
}

rotateArray(['1', '2', '3', '4', '2']);

//05 Extract Increasing Subsequence from an Array
function extractFromArray(input) {
    let result = input.reduce((acc, x) => {
        if (acc[acc.length - 1] <= x || acc.length === 0) {
            acc.push(x);
        }
        return acc;
    }, []);

    console.log(result.join("\n"));
}

extractFromArray([1, 3, 8, 4, 10, 12, 3, 2, 24]);

//06 Sort array
function sortStringArray(input) {
    console.log(input.sort((a, b) => a.length - b.length || a.localeCompare(b))
        .join("\n"));
}

sortStringArray(['alpha', 'beta', 'gamma']);

//07 Magic Matrices
function magicMatrices(input) {
    let sumFirstRow = input[0].reduce((acc, x) => acc + x);
    let isMagic = true;

    for (let row = 0; row < input.length; row++) {
        let sumRow = input[row].reduce((acc, x) => acc + x);
        let sumColumn = input.reduce((acc, x) => {
            return acc += x[row];
        }, 0);

        if (sumFirstRow !== sumRow || sumFirstRow !== sumColumn) {
            isMagic = false;
            break;
        }
    }

    console.log(isMagic);
}

magicMatrices([[4, 5, 6], [6, 5, 4], [5, 5, 5]]);

//08 Tic-Tac-Toe
function ticTacToe(input) {
    let playerOne = "X";
    let playerTwo = "O";

    let dashboard =
        [[false, false, false],
        [false, false, false],
        [false, false, false]];

    let player = playerOne;

    for (let i = 0; i < input.length; i++) {
        let currentMove = input[i].split(" ");

        while (dashboard[currentMove[0]][currentMove[1]] != false) {
            console.log("This place is already taken. Please choose another!");
            currentMove = input[i + 1].split(" ");
            i++;
        }

        dashboard[currentMove[0]][currentMove[1]] = player;

        if (checkDashboardForWinner(dashboard, player)) {
            console.log(`Player ${player} wins!`);
            printDashboard();
            break;
        }

        if (i >= 8 && checIskDashboardFull(dashboard)) {
            console.log("The game ended! Nobody wins :(");
            printDashboard();
            break;
        }

        player = player === playerOne ? playerTwo : playerOne;
    }

    function checkDashboardForWinner(board, player) {
        let firstDiagonal = [];
        let secondDiagonal = [];

        for (let row = 0; row < board.length; row++) {
            let isRowWinner = board[row].every(x => x === player);
            let isColumnWinner = board.reduce((acc, x) => {
                acc.push(x[row])
                return acc
            }, []).every(x => x === player);

            if (isRowWinner || isColumnWinner) {
                return true;
            }

            firstDiagonal.push(board[row][row]);
            secondDiagonal.push(board[row][board.length - 1 - row]);
        }

        return firstDiagonal.every(x => x === player) || secondDiagonal.every(x => x === player);
    }

    function checIskDashboardFull(board) {
        let result = board.reduce((acc, x) => {
            acc.push(x.every(el => el !== false));
            return acc;
        }, []).every(x => x === true);

        return result;
    }

    function printDashboard() {
        for (let i = 0; i < dashboard.length; i++) {
            dashboard[i] = dashboard[i].join("\t");
        }
        console.log(dashboard.join("\n"));
    }
}

//ticTacToe(["0 1","0 0","0 2","2 0","1 0","1 1","1 2","2 2","2 1","0 0"]);
//ticTacToe(["0 0", "0 0", "1 1", "0 1", "1 2", "0 2", "2 2", "1 2", "2 2", "2 1"]);
ticTacToe(["0 1", "0 0", "0 2", "2 0", "1 0", "1 2", "1 1", "2 1", "2 2", "0 0"]);

//09 Diagonal Attack
function diagonalAttack(input) {
    let matrix = input.map(x => x.split(" ").map(y => +y));

    let diagonals = matrix.reduce((acc, curr, i) => {
        acc[0] += curr[i];
        acc[1] += curr[curr.length - 1 - i];
        return acc;
    }, [0, 0]);

    if (diagonals[0] == diagonals[1]) {
        let sum = diagonals[0];

        matrix = matrix.reduce((acc, curr, i) => {
            let row = new Array(curr.length);
            row.fill(sum);

            row[i] = curr[i];
            row[row.length - 1 - i] = curr[curr.length - 1 - i];
            acc.push(row);
            return acc;
        }, []);
    }

    console.log(matrix.reduce((acc, curr) => {
        acc.push(curr.join(" "));
        return acc;
    }, []).join("\n"));
}

diagonalAttack(['5 3 12 3 1', '11 4 23 2 5', '101 12 3 21 10', '1 4 5 2 2', '5 22 33 11 1']);

//10 Orbit
function orbit(input) {
    let rows = input[0];
    let cols = input[1];
    let starRow = input[2];
    let starCol = input[3];

    let matrix = new Array(rows).fill().map(() => new Array(cols).fill(0));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            matrix[row][col] = Math.max(Math.abs(row - starRow), Math.abs(col - starCol)) + 1;
        }
    }

    console.log(matrix.map(row => row.join(" ")).join("\n"));
}

orbit([4, 4, 0, 0]);

//11 Spiral Matrix
function spiralMatrix(cols, rows) {
    let numCols = +cols, numRows = +rows;
    let maxElement = numCols * numRows;

    let element = 0;
    let startRowIndex = 0;
    let endRowIndex = numRows - 1;
    let startColIndex = 0;
    let endColIndex = numCols - 1;
    let matrix = new Array(numRows).fill().map(() => new Array(numCols).fill(0));

    while (true) {
        for (let i = startColIndex; i <= endColIndex; i++) {
            matrix[startRowIndex][i] = ++element;
        }
        startRowIndex++;
        if (element == maxElement) break;

        for (let i = startRowIndex; i <= endRowIndex; i++) {
            matrix[i][endColIndex] = ++element;
        }
        endColIndex--;
        if (element == maxElement) break;

        for (let i = endColIndex; i >= startColIndex; i--) {
            matrix[endRowIndex][i] = ++element;
        }
        endRowIndex--;
        if (element == maxElement) break;

        for (let i = endRowIndex; i >= startRowIndex; i--) {
            matrix[i][startColIndex] = ++element;
        }
        startColIndex++;
        if (element == maxElement) break;
    }

    console.log(matrix.reduce((acc, curr) => {
        acc.push(curr.join(" "));
        return acc;
    }, []).join("\n"));
}

spiralMatrix(5, 5);