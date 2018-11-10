function Snake(pic_obj) {
    this.arr = [
        {row: 4, col: 4},
        {row: 4, col: 5},
        {row: 4, col: 6},
        {row: 4, col: 7},
        {row: 4, col: 8}
    ];
    this.direction = 39; //left:37,up:38,right:39,down:40
    this.lock = true;
    this.head_pic = pic_obj.head_pic;
    this.body_pic = pic_obj.body_pic;
    this.tail_pic = pic_obj.tail_pic;
    this.head_idx = 2;
    this.tail_idx = 0;
}
//移动
Snake.prototype.move = function() {
    // 创建头
    var newHead = {
        row: this.arr[this.arr.length - 1].row,
        col: this.arr[this.arr.length - 1].col
    }
    // 判断蛇的移动方向
    // if(this.direction === 37) {
    //     newHead.col--;
    // }else if(this.direction === 38) {
    //     newHead.row--;
    // }else if(this.direction === 39) {
    //     newHead.col++;
    // }else if(this.direction === 40) {
    //     newHead.row++;
    // }
    switch (this.direction) {
        case 37 :
            newHead.col--;
            break;
        case 38 :
            newHead.row--;
            break;
        case 39 :
            newHead.col++;
            break;
        case 40 :
            newHead.row++;
            break;
    }
    this.arr.push(newHead);
    this.arr.shift();
    this.lock = true;

    var tail = this.arr[0];
    var prev_tail = this.arr[1];
    if(tail.row === prev_tail.row) {
        this.tail_idx = tail.col > prev_tail.col ? 2 : 0;
    }else {
        this.tail_idx = tail.row > prev_tail.row ? 3 : 1;
    }
}

//转向
Snake.prototype.turn = function(direction) {
    if(!this.lock) {
        return;
    }
    this.lock = false;
    var result = Math.abs(direction - this.direction);
    if(result === 2 || result === 0) {
        return;
    }else {
        this.direction = direction;
    }
    // 转向时改变头部的图片
    switch (direction) {
        case 37 :
            this.head_idx = 0;
            break;
        case 38 :
            this.head_idx = 1;
            break;
        case 39 :
            this.head_idx = 2;
            break;
        case 40 :
            this.head_idx = 3;
            break;
    }
}

// 生长
Snake.prototype.growUp = function() {
    var tail = this.arr[0];
    this.arr.unshift(tail);
}