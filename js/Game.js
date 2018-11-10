function Game(map,snake,food,block) {
    this.map = map;
    this.snake = snake;
    this.food = food;
    this.block = block;
    this.timer = null;
    this.flag = null;
    this.init();
}
// 初始化游戏
Game.prototype.init = function() {
    this.renderMap();
    this.renderFood();
    this.renderSnake();
    this.renderBlock();
    this.start();
    this.bindEvent();
}
// 渲染地图
Game.prototype.renderMap = function() {
    this.map.fill();
}
// 渲染食物
Game.prototype.renderFood = function() {
    var row = this.food.row;
    var col = this.food.col;
    this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
    this.map.arr[row][col].style.backgroundSize = "cover";
}
// 渲染蛇
Game.prototype.renderSnake = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
    for(var i = 1; i < this.snake.arr.length - 1; i++) {
        var row = this.snake.arr[i].row;
        var col = this.snake.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
    }
    var tail = this.snake.arr[0];
    this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}

// 开始游戏的方法
Game.prototype.start = function() {
    this.flag = true;
    var me = this;
    this.timer = setInterval(function() {
        // 移动
        me.snake.move();
        // 检查边界
        me.checkMap();
        // 吃食物
        me.eatFood();
        // 吃自己
        me.eatSnake();
        // 检查障碍物
        me.checkBlock();
        if(me.flag) {
            // 清屏
            me.map.clear();
            // 渲染食物
            me.renderFood();
            // 渲染蛇
            me.renderSnake();
            // 渲染障碍
            me.renderBlock();
        }
    },200)
}

// 绑定键盘事件
Game.prototype.bindEvent = function() {
    var me = this;
    document.onkeydown = function(e) {
        var code = e.keyCode;
        if(code === 37 || code === 38 || code === 39 || code === 40) {
            me.snake.turn(code);
        }
    }
}
// 检测边界
Game.prototype.checkMap = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
        this.gameOver();
    }
}

// 游戏结束
Game.prototype.gameOver = function() {
    clearInterval(this.timer);
    this.flag = false;
    alert("手法不行啊，小伙子");
}

// 吃食物
Game.prototype.eatFood = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    var food = this.food;
    if(head.row === food.row && head.col === food.col) {
        // 蛇生长
        this.snake.growUp();
        // 重置食物
        this.resetFood();
    }
}

// 重置食物的方法
Game.prototype.resetFood = function() {
    // 随机生成row,col
    var row = parseInt(Math.random() * this.map.row);
    var col = parseInt(Math.random() * this.map.col);
    // 检测食物是否在蛇身上
    for(var i = 0; i < this.snake.arr.length; i++) {
        if(row === this.snake.arr[i].row && col === this.snake.arr[i].col) {
            // 重新生成
            this.resetFood();
            return;
        }
    }
    // 检测食物是否在障碍身上
    for(var j = 0; j < this.block.arr.length; j++) {
        if(row === this.block.arr[j].row && col === this.block.arr[j].col) {
            // 重新生成
            this.resetFood();
            return;
        }
    }
    this.food.reset(row,col);
}

// 蛇吃自己
Game.prototype.eatSnake = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    for(var i = 0; i < this.snake.arr.length - 1; i++) {
        var body = this.snake.arr[i];
        if(head.row === body.row && head.col === body.col) {
            this.gameOver();
        }
    }
}


// 渲染障碍物
Game.prototype.renderBlock = function() {
    for(var i = 0; i < this.block.arr.length; i++) {
        var row = this.block.arr[i].row;
        var col = this.block.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
        this.map.arr[row][col].style.backgroundSize = "cover";
    } 
}

// 检测障碍物
Game.prototype.checkBlock = function() {
    var head = this.snake.arr[this.snake.arr.length - 1];
    for(var i = 0; i < this.block.arr.length; i++) {
        var row = this.block.arr[i].row;
        var col = this.block.arr[i].col;
        if(row === head.row && col === head.col) {
            this.gameOver();
        }
    }
}