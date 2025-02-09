const BOARD_SIZE = 15;
let currentPlayer = 1; // 1: 黑棋, 2: 白棋
let gameOver = false;
let board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));

function initGame() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';
    
    // 创建棋盘格子
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            chessboard.appendChild(cell);
        }
    }
    
    // 初始化棋盘交叉点
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if ((row === 3 || row === 11) && (col === 3 || col === 11)) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #000;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            `;
            cell.appendChild(dot);
        }
    });
}

function handleCellClick(e) {
    if (gameOver) return;
    
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    if (board[row][col] !== 0) return;
    
    // 放置棋子
    const stone = document.createElement('div');
    stone.className = 'stone';
    stone.style.backgroundColor = currentPlayer === 1 ? '#000' : '#fff';
    e.target.appendChild(stone);
    
    // 更新棋盘状态
    board[row][col] = currentPlayer;
    
    // 检查胜利
    if (checkWin(row, col)) {
        gameOver = true;
        document.getElementById('status').textContent = `${currentPlayer === 1 ? '黑方' : '白方'}获胜！`;
        return;
    }
    
    // 切换玩家
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('status').textContent = `${currentPlayer === 1 ? '黑方' : '白方'}回合`;
}

function checkWin(row, col) {
    const directions = [
        [ [0, -1], [0, 1] ], // 水平
        [ [-1, 0], [1, 0] ], // 垂直
        [ [-1, -1], [1, 1] ], // 左上到右下
        [ [-1, 1], [1, -1] ] // 右上到左下
    ];

    for (let dir of directions) {
        let count = 1;
        
        for (let d of dir) {
            let r = row + d[0];
            let c = col + d[1];
            
            while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
                if (board[r][c] === currentPlayer) {
                    count++;
                    r += d[0];
                    c += d[1];
                } else {
                    break;
                }
            }
        }
        
        if (count >= 5) return true;
    }
    
    return false;
}

function resetGame() {
    board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    currentPlayer = 1;
    gameOver = false;
    document.getElementById('status').textContent = '黑方回合';
    document.querySelectorAll('.stone').forEach(stone => stone.remove());
}

// 初始化游戏
initGame();
