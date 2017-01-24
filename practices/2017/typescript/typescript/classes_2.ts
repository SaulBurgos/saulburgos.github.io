interface IAutoBase {
   wheels: number;
   size: string;
   type: string;
   getInfo(info: string): void;
}

class Auto implements IAutoBase {
   wheels: number;
   size: string;
   type: string = 'none';

   constructor(currentWheels: number, currentSize: string) {
      this.wheels = currentWheels;
      this.size = currentSize;
   }

   getInfo(info: string) {
      console.log(this.type + ' ' + this.wheels + ' ' + this.size);
   }
}

class Bike extends Auto {
   constructor(currentWheels: number, currentSize: string,currentType: string) {
      super(currentWheels, currentSize);
      this.type = currentType;
   }
}

class Sedan extends Auto {
   constructor(currentWheels: number, currentSize: string,currentType: string) {
      super(currentWheels, currentSize);
      this.type = currentType;
   }
}

class Truck extends Auto {
   constructor(currentWheels: number, currentSize: string,currentType: string) {
      super(currentWheels, currentSize);
      this.type = currentType;
   }
}

let saulBike = new Bike(2,'small','suzuki');
saulBike.getInfo('1');
let mamaCar = new Sedan(4,'medium','toyota');
mamaCar.getInfo('3');
let papaCar = new Sedan(8,'big','Mercedez');
papaCar.getInfo('2');

