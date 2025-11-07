import PubSub from "../PubSub.js";

describe("PubSub", () => {
  let testPubSub;
  beforeEach(() => {
    testPubSub = new PubSub();
    jest.clearAllMocks();
  });

  it("initializes with an events object", () => {
    expect(testPubSub.events).toBeDefined();
  });

  describe("PubSub.subscribe", () => {
    describe("when an event does not exist in events object", () => {
      it("creates a new event property and initializes its value as an array containing the callback argument", () => {
        testPubSub.subscribe("console stuff");
        expect(testPubSub.events["console stuff"]).toBeDefined();
      });
    });
    it("adds callback argument to event properties array", () => {
      const passedFunctionToLogData = (data) => {
        console.log(data);
      };
      testPubSub.subscribe("testEvent", passedFunctionToLogData);
      expect(testPubSub.events["testEvent"]).toContain(passedFunctionToLogData);
    });
  });

  describe("PubSub.publish", () => {
    it("invokes all callbacks for the event and passes the provided data to each one", () => {
      const addTwoNums = jest.fn((numOne, numTwo) => numOne + numTwo);
      const subtractTwoNums = jest.fn((numOne, numTwo) => numOne - numTwo);
      const multiplyTwoNums = jest.fn((numOne, numTwo) => numOne - numTwo);
      testPubSub.subscribe("testEvent", addTwoNums);
      testPubSub.subscribe("testEvent", subtractTwoNums);
      testPubSub.subscribe("testEvent", multiplyTwoNums);
      testPubSub.publish("testEvent", 2, 2);

      expect(addTwoNums.mock.results[0].value).toBe(4);
      expect(addTwoNums).toHaveBeenCalledTimes(1);
    });
  });
});
