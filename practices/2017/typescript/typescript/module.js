/// <reference path="folder/module2.ts" />
var module1;
(function (module1) {
    var Shapes;
    (function (Shapes) {
        var Rectangle = (function () {
            function Rectangle(width, height) {
                this.height = height;
                this.width = width;
            }
            Rectangle.prototype.getArea = function () {
                console.log(this.width * this.height);
                return this.width * this.height;
            };
            return Rectangle;
        }());
        Shapes.Rectangle = Rectangle;
    })(Shapes = module1.Shapes || (module1.Shapes = {}));
})(module1 || (module1 = {}));
var person = new module2.Testing.person();
person.sayHello();
//# sourceMappingURL=module.js.map