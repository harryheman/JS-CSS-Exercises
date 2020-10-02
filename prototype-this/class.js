class Animal {
  constructor(options) {
    this.name = options.name;
    this.color = options.color;
  }

  voice() {
    console.log("Base voice from", this.name);
  }
}

const dog = new Animal({
  name: "Rex",
  color: "white",
});

dog.voice();

class Cat extends Animal {
  constructor(options) {
    super(options);

    this.hasTail = options.hasTail;
    this.type = "cat";
  }

  voice() {
    super.voice();
    console.log("This sound goes from", this.name);
  }
}

const cat = new Cat({
  name: "Niko",
  color: "black",
  hasTail: true,
});

cat.voice();

// examples
Object.prototype.print = function () {
  console.log("I'm object", this);
};

cat.print();

Object.prototype.global = () => console.log("I'm global", this);

cat.global();

Array.prototype.myMap = function () {
  console.log("Array to map", this);
  return this.map.apply(this, arguments);
};

console.log([1, 3, 5, 7, 9].myMap((i) => i ** 2));

String.prototype.toTag = function (tagName) {
  return `<${tagName}>${this}</${tagName}>`;
};

console.log("foo".toTag("strong"));

Number.prototype.toBigInt = function () {
  return BigInt(this);
};

console.log(Number(42).toBigInt());
