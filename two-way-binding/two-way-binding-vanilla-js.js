/**
 * Implement 2 way binding in js.
 */

class TwoWayBinding {
  static BINDING_KEY = "cb-bind";
  constructor() {
    this.context = {};
    this.boundElements = document.querySelectorAll(
      `[${TwoWayBinding.BINDING_KEY}]`
    );
    this.handleInputs();
    document.getElementById("changeVar").addEventListener("click", () => {
      this.context["name"] = "New name";
    });
  }

  handleInputs() {
    if (this.boundElements && this.boundElements.length) {
      console.log("Total elements bound: " + this.boundElements.length);
      this.boundElements.forEach((element) => {
        const key = element.getAttribute(TwoWayBinding.BINDING_KEY);
        this.createContext(key);
        this.addEvents(key, element);
      });
    } else {
      console.log("No elements bound");
    }
  }

  createContext(key) {
    if (!this.context.hasOwnProperty(key)) {
      let value;
      Object.defineProperty(this.context, key, {
        set: (newValue) => {
          value = newValue;
          this.updateView(key, value);
        },
        get: () => {
          return value;
        },
        enumerable: true
      });
    }
  }

  addEvents(key, element) {
    switch (element.tagName) {
      case "INPUT":
        element.addEventListener("keyup", (event) => {
          this.context[key] = event.target.value;
        });
        break;
      case "SELECT":
        break;
      default:
        break;
    }
  }

  updateView(key, value) {
    const attribute = `[cb-${key}]`;
    console.log(document.querySelector(attribute), attribute);
    document.querySelector(attribute).innerHTML = value;
    document.querySelector(`[cb-bind="${key}"]`).value = value;
  }
}

new TwoWayBinding();
