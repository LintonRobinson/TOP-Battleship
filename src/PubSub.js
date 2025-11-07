class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (this.events[event]) {
      this.events[event].push(callback);
    } else {
      this.events[event] = [callback];
    }
  }

  publish(event, ...data) {
    if (this.events[event]) {
      this.events[event].forEach((event) => {
        event(...data);
      });
    }
  }
}

export default PubSub;
