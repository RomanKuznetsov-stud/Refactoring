class Shape {
    static MAX_PAINT = 100;
    static PAINT_PER_DRAW = 10;
    static MAX_STEPS = 10;

    static total = Shape.MAX_PAINT;
    static step = 0;

    constructor(size) {
        this.size = size;
    }

    static fill() {
        Shape.total = Shape.MAX_PAINT;
        Shape.step = 0;
        alert("Paint refilled!");
    }

    draw() {

        if (Shape.total <= 0) {
            alert("No paint left! Please refill.");
            return null;
        }

        Shape.total -= Shape.PAINT_PER_DRAW;
        const square = document.createElement("div");
        square.classList.add("square");

        const r = 255;
        const colorStep = 255 / Shape.MAX_STEPS;
        const g = Math.min(255, Shape.step * colorStep);
        const b = Math.min(255, Shape.step * colorStep);

        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        Shape.step = Math.min(Shape.step + 1, Shape.MAX_STEPS);

        return square;
    }
}

const drawButton = document.getElementById("drawButton");
const fillButton = document.getElementById("fillButton");
const shapesContainer = document.getElementById("shapes");

drawButton.addEventListener("click", () => {

    const shape = new Shape(30);
    const square = shape.draw();

    if (square) {
        shapesContainer.appendChild(square);
    }
});

fillButton.addEventListener("click", () => {
    Shape.fill();
});
