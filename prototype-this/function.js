const Animal = function (options) {
  this.name = options.name;
  this.color = options.color;

  // this.voice = function() {
  //   console.log('Base voice from', this.name)
  // }
};

Animal.prototype.voice = function () {
  console.log("Base voice from", this.name);
};

const dog = new Animal({
  name: "Rex",
  color: "#fff",
});

dog.voice();

const Cat = function (options) {
  Animal.apply(this, arguments);
  this.hasTail = options.hasTail;
  this.type = "cat";
};

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Animal.prototype.voice = function () {
  console.log("This sound goes from", this.name);
};

const cat = new Cat({
  name: "Niko",
  color: "#000",
  hasTail: true,
});

cat.voice();

Cat.prototype.voice = function () {
  Animal.prototype.voice.apply(this, arguments);
  console.log("Woof!");
};

cat.voice();
dog.voice();
