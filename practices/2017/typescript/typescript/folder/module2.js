var module2;
(function (module2) {
    var Testing;
    (function (Testing) {
        var person = (function () {
            function person() {
            }
            person.prototype.sayHello = function () {
                console.log('hi I am Saul burgos');
            };
            return person;
        }());
        Testing.person = person;
        function run() {
            var rec = new module1.Shapes.Rectangle(10, 10);
            rec.getArea();
        }
        Testing.run = run;
    })(Testing = module2.Testing || (module2.Testing = {}));
})(module2 || (module2 = {}));
//# sourceMappingURL=module2.js.map