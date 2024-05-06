
let cells = [...document.querySelectorAll('.cell')];
var restart = document.querySelector('#restart');
var player = document.querySelector('.player');
var button_o = document.querySelector('#player_o');
var button_x = document.querySelector('#player_x');
var currentPlayer = 'X';
var board = [['', '', ''], ['', '', ''], ['', '', '']];
var gameOver = false;
var playing = 'X';

var endGame = () => {
    let result = winner();
    if(result) {

        gameOver = true;
        
        if (result === 'tie') {
            player.innerHTML = 'Empate!';
        } else {
            player.innerHTML = `${result} venceu!`;
        }
    
    }
}
var changePlayer = (selected_player) => {
    playing = selected_player;
    restartGame();
    player.innerHTML = `${currentPlayer}`;
    if(selected_player === 'X') {
        button_x.classList.add('player_selected');
        button_o.classList.remove('player_selected');
    }else {
        button_o.classList.add('player_selected');
        button_x.classList.remove('player_selected');
        minimaxPlay();
    }
}
var cellClicked = async (event) =>{
    let index = event.target.id.split('-')[1];
    let row = Math.floor(index / 3);
    let col = index % 3;

    if (board[row][col] !== '' || gameOver) {
        return;
    }
    board[row][col] = currentPlayer;

    event.target.innerHTML = `<p class="player_text">${currentPlayer}</p>`;
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

    player.innerHTML = `${currentPlayer}`;
    await minimaxPlay();
    endGame();
}
var restartGame = () => {
    cells.forEach(element => {
        element.innerHTML = '';
    });
    board = [['', '', ''], ['', '', ''], ['', '', '']];

    currentPlayer = 'X';
    if(button_o.classList.contains('player_selected') && playing === 'O') {
        minimaxPlay();
    }
    player.innerHTML = `${currentPlayer}`;
    gameOver = false;
}
restart.addEventListener('click', restartGame)

cells.forEach(element => {
    element.addEventListener('click', cellClicked);
});

var winner = () => {
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
        return board[0][0];
    }
    if (board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
        return board[1][0];
    }
    if (board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
        return board[2][0];
    }
    if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
        return board[0][0];
    }
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
        return board[0][1];
    }
    if (board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
        return board[0][2];
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }
    if (board[0][0] !== '' && board[0][1] !== '' && board[0][2] !== '' && board[1][0] !== '' && board[1][1] !== '' && board[1][2] !== '' && board[2][0] !== '' && board[2][1] !== '' && board[2][2] !== '') {
        return 'tie';
    }
}
minimaxPlay = () => {
    return fetch('http://localhost:5000/minimax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board: board, player: currentPlayer }),
        })
        .then(response => response.json())
        .then(data => {

            let [row, col] = data.best_action;
            board[row][col] = currentPlayer;

            let index = row * 3 + col;
            let cell = document.getElementById(`cell-${index}`);
            cell.innerHTML = `<p class="player_text">${currentPlayer}</p>`;
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            player.innerHTML = `${currentPlayer}`;
        })
        .catch((error) => {
            console.error('Erro:', error);
        });

    
}

button_o.addEventListener('click', () => changePlayer('O'));
button_x.addEventListener('click', () => changePlayer('X'));