var _this = this;
var myName = 'outsite';
var kids = 9999;
var white = {
    myName: 'Saul',
    age: 35,
    kids: 0,
    getInfo: function () {
        var msg = _this.myName + ' kids :' + _this.kids;
        console.log(msg);
        return msg;
    }
};
var black = {
    myName: 'Miguel',
    age: 30,
    kids: 1,
    getInfo: function () {
        var msg = this.myName + ' kids :' + this.kids;
        console.log(msg);
        return msg;
    }
};
white.getInfo();
black.getInfo();
//# sourceMappingURL=main.js.map