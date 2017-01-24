class Engine {
   constructor(public horsePower: number,public engineType: string) {

   }
}

class Car {
   private _engine: Engine;

   constructor(engine: Engine) {
      this.engine = engine;
   }

   get engine(): Engine {
      return this._engine;
   }

   set engine(value: Engine) {
      if(typeof value === undefined) {
         throw 'Please supple an engine';
      } else {
         this._engine = value;
      }
   }

   start(): void {
      console.log('Engine started ' + this._engine.horsePower + ' ' + this._engine.engineType );
   }
}

window.onload = function() {
   let engine = new Engine(500,'V8');
   let toyota = new Car(engine);
   toyota.start();
}