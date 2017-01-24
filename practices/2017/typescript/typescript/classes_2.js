var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Auto = (function () {
    function Auto(currentWheels, currentSize) {
        this.type = 'none';
        this.wheels = currentWheels;
        this.size = currentSize;
    }
    Auto.prototype.getInfo = function (info) {
        console.log(this.type + ' ' + this.wheels + ' ' + this.size);
    };
    return Auto;
}());
var Bike = (function (_super) {
    __extends(Bike, _super);
    function Bike(currentWheels, currentSize, currentType) {
        var _this = _super.call(this, currentWheels, currentSize) || this;
        _this.type = currentType;
        return _this;
    }
    return Bike;
}(Auto));
var Sedan = (function (_super) {
    __extends(Sedan, _super);
    function Sedan(currentWheels, currentSize, currentType) {
        var _this = _super.call(this, currentWheels, currentSize) || this;
        _this.type = currentType;
        return _this;
    }
    return Sedan;
}(Auto));
var Truck = (function (_super) {
    __extends(Truck, _super);
    function Truck(currentWheels, currentSize, currentType) {
        var _this = _super.call(this, currentWheels, currentSize) || this;
        _this.type = currentType;
        return _this;
    }
    return Truck;
}(Auto));
var saulBike = new Bike(2, 'small', 'suzuki');
saulBike.getInfo('1');
var mamaCar = new Sedan(4, 'medium', 'toyota');
mamaCar.getInfo('3');
var papaCar = new Sedan(8, 'big', 'Mercedez');
papaCar.getInfo('2');
//# sourceMappingURL=classes_2.js.map