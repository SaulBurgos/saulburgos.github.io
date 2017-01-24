var Engine = (function () {
    function Engine(horsePower, engineType) {
        this.horsePower = horsePower;
        this.engineType = engineType;
    }
    return Engine;
}());
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Object.defineProperty(Car.prototype, "engine", {
        get: function () {
            return this._engine;
        },
        set: function (value) {
            if (typeof value === undefined) {
                throw 'Please supple an engine';
            }
            else {
                this._engine = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Car.prototype.start = function () {
        console.log('Engine started ' + this._engine.horsePower + ' ' + this._engine.engineType);
    };
    return Car;
}());
window.onload = function () {
    var engine = new Engine(500, 'V8');
    var toyota = new Car(engine);
    toyota.start();
};
//# sourceMappingURL=classes_.js.map