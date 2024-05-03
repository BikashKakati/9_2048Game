export default class Tile {
    #tileElement;
    #x;
    #y;
    #value;

    constructor(gameContainer, value = Math.random() > .5 ? 2 : 4) {
        this.#tileElement = document.createElement("div");
        this.#tileElement.classList.add("tile");
        gameContainer.append(this.#tileElement);
        this.value = value;
    }

    set value(v) {
        this.#value = v;
        this.#tileElement.textContent = v;

        const powerOfTwo = Math.log2(v);
        const backgroundLightness = 100 - powerOfTwo * 10;
        const fontLightness = backgroundLightness <= 50 ? 90 : 10;

        this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        this.#tileElement.style.setProperty("--font-lightness", `${fontLightness}%`);
    }
    get value() {
        return this.#value;
    }

    set x(value) {
        this.#x = value;
        this.#tileElement.style.setProperty("--x", value);
    }
    set y(value) {
        this.#y = value;
        this.#tileElement.style.setProperty("--y", value);
    }
    remove() {
        this.#tileElement.remove();
    }
    waitForTransition(animation = false) {
        return new Promise((resolve, reject) => {
            this.#tileElement.addEventListener(animation ? "animationend" : "transitionend", resolve, { once: true })
        })
    }
}