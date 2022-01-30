class RandomNumberGenerator {
  constructor() {
    this.generateBtn = document.querySelector(".generate-btn");
    this.max = document.querySelector("#max");
    this.min = document.querySelector("#min");
    this.quantity = document.querySelector("#quantity");
    this.numbers = document.querySelector(".numbers");

    this.maxDefaultValue = document.querySelector("#max").value;
    this.minDefaultValue = document.querySelector("#min").value;
    this.quantityDefaultValue = document.querySelector("#quantity").value;
  }

  init() {
    this.configureGenerateButtonEvent();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateNumbers() {
    const min = Number(this.min.value) || this.minDefaultValue;
    const max = Number(this.max.value) || this.maxDefaultValue;
    const quantity = Number(this.quantity.value) || this.quantityDefaultValue;

    const range = min === 0 ? max - min + 1 : max - min;

    if (Number(this.min.value) < 0 ) {
      throw new Error("The minimum value must be greater than or equal to zero!");
    }

    if ( Number(this.max.value) <= 0 ) {
      throw new Error("The maximum value must be greater than zero!");
    }

    if (Number(this.quantity.value) <= 0) {
      throw new Error("The quantity value must be greater than zero!");
    }

    if (quantity > range) {
      throw new Error("Invalid quantity. The quantity must be less than the range between the minimum and maximum.");
    }

    const numbers = [];
    while (numbers.length < quantity) {
      const number = this.getRandomInt(min, max);

      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    return numbers;
  }

  createNumberElement(value) {
    const numberDIV = document.createElement("div");

    numberDIV.innerText = value;
    numberDIV.classList.add("number");

    return numberDIV;
  }

  clearNumbers() {
    this.numbers.innerHTML = "";
  }

  insertValueInToHTML() {
    try {
      const numbers = this.generateNumbers();

      this.clearNumbers();

      for (let number of numbers) {
        const element = this.createNumberElement(number);

        this.numbers.appendChild(element);
      }
    } catch (error) {
      alert(error.message);
      this.clearNumbers();
    }
  }

  configureGenerateButtonEvent() {
    this.generateBtn.addEventListener("click", () => {
      this.insertValueInToHTML();
    });
  }
}

const randomNumberGenerator = new RandomNumberGenerator();

randomNumberGenerator.init();
