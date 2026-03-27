
class Shape {

    static total = 100;
    static step = 0;

    constructor(size) {
        this.size = size;
    }

    static fill() {
        Shape.total = 100;
        Shape.step = 0;
        alert("Paint refilled!");
    }

    draw() {

        if (Shape.total <= 0) {
            alert("No paint left! Please refill.");
            return null;
        }

        Shape.total -= 10;
        const square = document.createElement("div");
        square.classList.add("square");

        const r = 255;
        const g = Math.min(255, Shape.step * 25.5);
        const b = Math.min(255, Shape.step * 25.5);

        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        Shape.step = Math.min(Shape.step + 1, 10);

        return square;
    }
}

const drawButton = document.getElementById("drawButton");
const fillButton = document.getElementById("fillButton");
const shapesContainer = document.getElementById("shapes");

drawButton.addEventListener("click", () => {

    if (Shape.total <= 0) {
        alert("No paint left! Please refill.");
        return;
    }

    const shape = new Shape(30);
    const square = shape.draw();

    if (square) {
        shapesContainer.appendChild(square);
    }
});

fillButton.addEventListener("click", () => {
    Shape.fill();
});
