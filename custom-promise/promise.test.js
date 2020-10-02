const CustomPromise = require("./promise");

const t = setTimeout;

describe("Custom Promise", () => {
  let promise;
  let executor;

  const successResult = 42;
  const errorResult = "error";

  beforeEach(() => {
    executor = jest.fn((r) => t(() => r(successResult), 1000));
    promise = new CustomPromise(executor);
  });

  test("should exists and to be typeof function", () => {
    expect(CustomPromise).toBeDefined();
    expect(typeof CustomPromise).toBe("function");
  });

  test("instance should have methods: then, catch, finally", () => {
    expect(promise.then).toBeDefined();
    expect(promise.catch).toBeDefined();
    expect(promise.finally).not.toBeUndefined();
  });

  test("should call executor function", () => {
    expect(executor).toHaveBeenCalled();
  });

  test("should get data in then block and chain them", async () => {
    const result = await promise.then((num) => num).then((num) => num * 2);
    expect(result).toBe(successResult * 2);
  });

  test("should catch error", () => {
    const errorExecutor = (_, rej) => t(() => rej(errorResult), 1000);
    const errorPromise = new CustomPromise(errorExecutor);

    return new Promise((resolve) => {
      errorPromise.catch((er) => {
        expect(er).toBe(errorResult);
        resolve();
      });
    });
  });

  test("should call finally method", async () => {
    const finallySpy = jest.fn(() => {});
    await promise.finally(finallySpy);

    expect(finallySpy).toHaveBeenCalled();
  });
});
