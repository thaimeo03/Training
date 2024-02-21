var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var winBoard = [
    [1, 2, 3],
    [8, 0, 4],
    [7, 6, 5]
];
var visit = {};
var NodeBFS = /** @class */ (function () {
    function NodeBFS(board, parent) {
        this.node = {
            board: board,
            parent: parent
        };
    }
    NodeBFS.prototype.findPath = function (path, nodeBfs) {
        if (nodeBfs === null || nodeBfs.node.parent === null) {
            return path;
        }
        return this.findPath(__spreadArray(__spreadArray([], path, true), [nodeBfs.node.board], false), nodeBfs.node.parent);
    };
    return NodeBFS;
}());
var getEmptyCellPosition = function (board) {
    var xPosition = 0;
    var yPosition = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                xPosition = i;
                yPosition = j;
            }
        }
    }
    return { x: xPosition, y: yPosition };
};
var checkMove = function (emptyCellPos) {
    var canMove = {
        left: emptyCellPos.y !== 0,
        right: emptyCellPos.y !== 2,
        up: emptyCellPos.x !== 0,
        down: emptyCellPos.x !== 2
    };
    return canMove;
};
var leftMove = function (board) {
    var tempBoard = copyBoard(board);
    var emptyCellPos = getEmptyCellPosition(tempBoard);
    var temp = tempBoard[emptyCellPos.x][emptyCellPos.y];
    tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x][emptyCellPos.y - 1];
    tempBoard[emptyCellPos.x][emptyCellPos.y - 1] = temp;
    return tempBoard;
};
var rightMove = function (board) {
    var tempBoard = copyBoard(board);
    var emptyCellPos = getEmptyCellPosition(tempBoard);
    var temp = tempBoard[emptyCellPos.x][emptyCellPos.y];
    tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x][emptyCellPos.y + 1];
    tempBoard[emptyCellPos.x][emptyCellPos.y + 1] = temp;
    return tempBoard;
};
var upMove = function (board) {
    var tempBoard = copyBoard(board);
    var emptyCellPos = getEmptyCellPosition(tempBoard);
    var temp = tempBoard[emptyCellPos.x][emptyCellPos.y];
    tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x - 1][emptyCellPos.y];
    tempBoard[emptyCellPos.x - 1][emptyCellPos.y] = temp;
    return tempBoard;
};
var downMove = function (board) {
    var tempBoard = copyBoard(board);
    var emptyCellPos = getEmptyCellPosition(tempBoard);
    var temp = tempBoard[emptyCellPos.x][emptyCellPos.y];
    tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x + 1][emptyCellPos.y];
    tempBoard[emptyCellPos.x + 1][emptyCellPos.y] = temp;
    return tempBoard;
};
var move = function (board) {
    var nextBoards = [];
    var canMove = checkMove(getEmptyCellPosition(board));
    if (canMove.left) {
        var nextBoard = leftMove(board);
        nextBoards.push(nextBoard);
    }
    if (canMove.right) {
        var nextBoard = rightMove(board);
        nextBoards.push(nextBoard);
    }
    if (canMove.up) {
        var nextBoard = upMove(board);
        nextBoards.push(nextBoard);
    }
    if (canMove.down) {
        var nextBoard = downMove(board);
        nextBoards.push(nextBoard);
    }
    return nextBoards;
};
var copyBoard = function (board) {
    var newBoard = [];
    for (var i = 0; i < 3; i++) {
        newBoard[i] = [];
        for (var j = 0; j < 3; j++) {
            newBoard[i][j] = board[i][j];
        }
    }
    return newBoard;
};
var showBoard = function (board) {
    for (var i = 0; i < 3; i++) {
        var rowString = "";
        for (var j = 0; j < 3; j++) {
            rowString += board[i][j] + " ";
        }
        console.log(rowString);
    }
    console.log("\n");
};
var isWin = function (board) {
    var count = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === winBoard[i][j]) {
                count++;
            }
        }
    }
    return count === 9;
};
var bfs = function (board) {
    var queue = [];
    queue.push(board);
    visit[JSON.stringify(board)] = true;
    var nodeBfs = new NodeBFS(board, null);
    while (queue.length > 0) {
        var tempBoard = queue.shift();
        var newBoards = move(tempBoard);
        var parent_1 = new NodeBFS(tempBoard, null);
        if (isWin(tempBoard)) {
            return parent_1.findPath([], nodeBfs);
        }
        for (var _i = 0, newBoards_1 = newBoards; _i < newBoards_1.length; _i++) {
            var board_1 = newBoards_1[_i];
            var boardString = JSON.stringify(board_1);
            if (!visit[boardString]) {
                queue.push(board_1);
                nodeBfs.node.parent = new NodeBFS(board_1, parent_1);
                visit[boardString] = true;
            }
        }
    }
};
var main = function () {
    var board = [
        [2, 8, 3],
        [1, 6, 4],
        [7, 0, 5]
    ];
    var path = bfs(board);
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var board_2 = path_1[_i];
        showBoard(board_2);
    }
    // const res = bfs(board)
    // for(const board of res) {
    //   showBoard(board)
    // }
};
main();
