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

const Player = (name, marker) => {
    return {name, marker};
};

const gameController = (function () {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let gameOver = false;
    

    const checkWin = () => {
        const board = gameBoard.getBoard();
        
        for (let i = 0; i < 3; i++){
        if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            return true;
        }}

        for (let i = 0; i < 3; i++){
        if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
            return true;
        }}

        if(board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
            return true;
        }
        
        if(board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
            return true;
        }
        
        return false;
    
    };
    
    const checkDraw = () => {
        const board = gameBoard.getBoard();
        for (let row of board) {
        for (let cell of row) {
            if (cell === 0) return false;
        }
    }
    return true;
    };

    const playTurn = (row, col) => {
        const board = gameBoard.getBoard();
        if (board[row][col] === 0){
            gameBoard.markCell(row, col, currentPlayer.marker);
        } else {
            return false;
        }
        
        if (checkWin()){
            gameOver = true;
            console.log(`${currentPlayer.name} wins!`);
        } 
        else if (checkDraw()){
            gameOver =  true;
            console.log(`It's a draw!`);
        } else {
            switchTurn();
        }
        
        return true;
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
    const getCurrentPlayer = () => currentPlayer;

    const isGameOver = () => gameOver;

    const reset = () => {currentPlayer = player1;
        gameOver = false;
    };

    return {
        playTurn,
        getCurrentPlayer,
        isGameOver, 
        reset
    };
   
})(); 


 
const displayController = (function () {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(function(box, index) {
        box.addEventListener('click', function() {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const board = gameBoard.getBoard();

            if(gameController.isGameOver()){return}
            
            const turnPlayed = gameController.playTurn(row,col);

            if(turnPlayed === true){
                box.textContent = board[row][col];
            }            
        });
      });

      const restartBtn = document.querySelector('.restart');
      restartBtn.addEventListener('click', () => {
        gameBoard.reset();
        boxes.forEach(box => {
            box.textContent ='';
        });
        gameController.reset();
      })
})(); 