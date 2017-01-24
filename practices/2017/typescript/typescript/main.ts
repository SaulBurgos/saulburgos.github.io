interface Person {
   myName: string,
   age: number,
   kids: number,
   getInfo: () => string
}

var myName = 'outsite';
var kids = 9999;

var white: Person = {
   myName: 'Saul',
   age: 35,
   kids: 0,
   getInfo: () => {
      let msg = this.myName + ' kids :' + this.kids;
      console.log(msg);
      return msg;
   }
};

var black: Person = {
   myName: 'Miguel',
   age: 30,
   kids: 1,
   getInfo: function() {
      let msg = this.myName + ' kids :' + this.kids;
      console.log(msg);
      return msg;
   }
};

white.getInfo();
black.getInfo();


