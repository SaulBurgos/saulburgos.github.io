namespace module2.Testing {

   export class person {
      constructor() {

      }

      sayHello(){
         console.log('hi I am Saul burgos');
      }

   }

   export function run() {
      var rec: module1.Shapes.IRectangle = new module1.Shapes.Rectangle(10,10);
      rec.getArea(); 
   }
}