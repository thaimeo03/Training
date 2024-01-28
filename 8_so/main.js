var winBoard = [
    [1, 2, 3],
    [8, 0, 4],
    [7, 6, 5]
];
var visit = {};
var Board = /** @class */ (function () {
    function Board(instance) {
        this.instance = instance;
    }
    Board.prototype.checkMove = function (emptyCellPos) {
        var canMove = {
            left: emptyCellPos.y !== 0,
            right: emptyCellPos.y !== 2,
            up: emptyCellPos.x !== 0,
            down: emptyCellPos.x !== 2
        };
        return canMove;
    };
    Board.prototype.leftMove = function () {
        var emptyCellPos = this.getEmptyCellPosition();
        var temp = this.instance[emptyCellPos.x][emptyCellPos.y];
        this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x][emptyCellPos.y - 1];
        this.instance[emptyCellPos.x][emptyCellPos.y - 1] = temp;
    };
    Board.prototype.rightMove = function () {
        var emptyCellPos = this.getEmptyCellPosition();
        var temp = this.instance[emptyCellPos.x][emptyCellPos.y];
        this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x][emptyCellPos.y + 1];
        this.instance[emptyCellPos.x][emptyCellPos.y + 1] = temp;
    };
    Board.prototype.upMove = function () {
        var emptyCellPos = this.getEmptyCellPosition();
        var temp = this.instance[emptyCellPos.x][emptyCellPos.y];
        this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x - 1][emptyCellPos.y];
        this.instance[emptyCellPos.x - 1][emptyCellPos.y] = temp;
    };
    Board.prototype.downMove = function () {
        var emptyCellPos = this.getEmptyCellPosition();
        var temp = this.instance[emptyCellPos.x][emptyCellPos.y];
        this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x + 1][emptyCellPos.y];
        this.instance[emptyCellPos.x + 1][emptyCellPos.y] = temp;
    };
    Board.prototype.getEmptyCellPosition = function () {
        var xPosition = 0;
        var yPosition = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.instance[i][j] === 0) {
                    xPosition = i;
                    yPosition = j;
                }
            }
        }
        return { x: xPosition, y: yPosition };
    };
    Board.prototype.isWin = function () {
        var count = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.instance[i][j] === winBoard[i][j]) {
                    count++;
                }
            }
        }
        return count === 9;
    };
    Board.prototype.showBoard = function () {
        this.instance.forEach(function (row) {
            console.log(row);
        });
        console.log("\n");
    };
    Board.prototype.getInstance = function () {
        return this.instance;
    };
    Board.prototype.toString = function () {
        return "".concat(this.instance);
    };
    return Board;
}());
var bfs = function (board) {
    var queue = [];
    queue.push(board);
    visit["".concat(board.toString())];
    while (queue.length > 0) {
        var tempBoard = queue.shift();
        if (tempBoard.isWin()) {
            // tempBoard.showBoard()
            break;
        }
        var canMove = tempBoard.checkMove(tempBoard.getEmptyCellPosition());
        var nextBoards = [];
        if (canMove.left) {
            var nextBoard = new Board(tempBoard.getInstance());
            nextBoard.leftMove();
            nextBoards.push(nextBoard);
        }
        if (canMove.right) {
            var nextBoard = new Board(tempBoard.getInstance());
            nextBoard.rightMove();
            nextBoards.push(nextBoard);
        }
        if (canMove.up) {
            var nextBoard = new Board(tempBoard.getInstance());
            nextBoard.upMove();
            nextBoards.push(nextBoard);
        }
        if (canMove.down) {
            var nextBoard = new Board(tempBoard.getInstance());
            nextBoard.downMove();
            nextBoards.push(nextBoard);
        }
        nextBoards.forEach(function (board) {
            board.showBoard();
        });
        for (var _i = 0, nextBoards_1 = nextBoards; _i < nextBoards_1.length; _i++) {
            var nextBoard = nextBoards_1[_i];
            if (!visit["".concat(nextBoard.toString())]) {
                queue.push(nextBoard);
                visit["".concat(nextBoard.toString())] = true;
            }
        }
        // console.log(visit)
    }
};
var main = function () {
    var board = new Board([
        [2, 8, 3],
        [1, 6, 4],
        [7, 0, 5]
    ]);
    bfs(board);
};
main();
