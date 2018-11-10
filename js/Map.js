function Map(row,col,width,height) {
    this.arr = [];
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.dom = document.createElement("div");
}
Map.prototype.fill = function() {
    for(var i = 0; i < this.row; i++) {
        var row_dom = document.createElement("div");
        row_dom.className = "row";
        var row_arr = [];
        for(var j = 0; j < this.col; j++) {
            var col_dom = document.createElement("span");
            col_dom.className = "grid";
            row_dom.appendChild(col_dom);
            row_arr.push(col_dom);
        }
        this.dom.appendChild(row_dom);
        this.arr.push(row_arr);
    }
    this.dom.className = "box";
    document.body.appendChild(this.dom);
}
Map.prototype.clear = function() {
    for(var i = 0; i < this.arr.length; i++) {
        for(var j = 0; j < this.arr[i].length; j++) {
            this.arr[i][j].style.backgroundImage = "none";
        }
    }
}