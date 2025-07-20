const gameBoard = (function () {
    let board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    
    const getBoard = () => board;

    const markCell = (row, col, marker) => {
        if (board[row][col] === 0){
            board[row][col] = marker;
            return true;
        } else {
            return false;
        }
        
    };
   
    const reset = () => {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    };

    return {
        getBoard,
        markCell,
        reset
    };
})();

const gameController = (function () {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    const checkWin = () => {};
    
    const checkDraw = () => ();

    const playTurn = (row, col) => {};
   
})(); 

 
const displayController = (function () {
   
})(); 