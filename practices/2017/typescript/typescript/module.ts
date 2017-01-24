/// <reference path="folder/module2.ts" />

namespace module1.Shapes {

   export interface IRectangle {
      width: number;
      height: number;
      getArea(): number;
   }
  
   export class Rectangle implements IRectangle {
      width: number;
      height: number;

      constructor(width: number,height: number) {
         this.height = height;
         this.width = width;
      }

      getArea() {  
         console.log(this.width * this.height);
         return this.width * this.height;
      }
   }
}

let person = new module2.Testing.person();
person.sayHello();
