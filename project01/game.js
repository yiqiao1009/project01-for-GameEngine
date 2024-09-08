// 获取canvas元素
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// 设置canvas大小
canvas.width = 400;
canvas.height = 400;

// 定义迷宫的大小和网格
const mazeSize = 10;
const cellSize = canvas.width / mazeSize;

// 定义迷宫结构 (1 表示墙, 0 表示路径)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// 玩家起始位置
let player = {
    x: 1,
    y: 1
};

// 终点位置
const goal = {
    x: 8,
    y: 8
};

// 绘制迷宫
function drawMaze() {
    for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'black';  // 墙壁颜色
            } else {
                ctx.fillStyle = 'white';  // 路径颜色
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// 绘制玩家
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

// 绘制终点
function drawGoal() {
    ctx.fillStyle = 'green';
    ctx.fillRect(goal.x * cellSize, goal.y * cellSize, cellSize, cellSize);
}

// 检查玩家是否可以移动
function canMove(x, y) {
    return maze[y] && maze[y][x] === 0;
}

// 处理键盘输入
window.addEventListener('keydown', function (e) {
    let newX = player.x;
    let newY = player.y;

    switch (e.key) {
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowDown':
            newY++;
            break;
        case 'ArrowLeft':
            newX--;
            break;
        case 'ArrowRight':
            newX++;
            break;
    }

    // 检查是否可以移动到新位置
    if (canMove(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }

    // 检查是否到达终点
    if (player.x === goal.x && player.y === goal.y) {
        alert('You Win!');
        player.x = 1;
        player.y = 1; // 重置玩家位置
    }

    // 重新绘制
    draw();
});

// 绘制游戏
function draw() {
    drawMaze();
    drawGoal();
    drawPlayer();
}

// 初始化绘制
draw();
