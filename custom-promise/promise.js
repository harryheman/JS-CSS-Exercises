const noop = () => {};

class CustomPromise {
  constructor(executor) {
    this.queue = [];
    this.errorHandler = noop;
    this.finallyHandler = noop;

    try {
      executor.call(null, this.onResolve.bind(this), this.onReject.bind(this));
    } catch (er) {
      this.errorHandler(er);
    } finally {
      this.finallyHandler();
    }
  }

  onResolve(data) {
    this.queue.forEach((cb) => {
      data = cb(data);
    });

    this.finallyHandler();
  }

  onReject(er) {
    this.errorHandler(er);

    this.finallyHandler();
  }

  then(cb) {
    this.queue.push(cb);
    return this;
  }

  catch(cb) {
    this.errorHandler = cb;
    return this;
  }

  finally(cb) {
    this.finallyHandler = cb;
    return this;
  }
}

const promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve("NgRx");
    reject("error");
  }, 1000);
});

promise
  .then((course) => course.toUpperCase())
  .then((title) => console.log(title))
  .catch((er) => console.error(er))
  .finally(() => console.log("finally"));

module.exports = CustomPromise;
