enum Color {
    RED,
    GREEN,
    BLACK
}

abstract class Shape {
    private readonly _color: Color;
    private readonly _name: string;

    protected constructor(color: Color, name: string) {
        this._color = color;
        this._name = name;
    }

    abstract calculateArea(): number;

    get color(): Color {
        return this._color;
    }

    get name(): string{
        return this._name;
    }

    protected getStringResultTemplate(): string {
        return `The result of calculation for ${this.name}: ${this.calculateArea()}`
    }
}

interface ShapePrinter {
    print(): void;
}

class Circle extends Shape implements ShapePrinter {
    private readonly radius: number;

    constructor(color: Color, name: string, radius: number) {
        super(color, name);
        this.radius = radius;
    }

    print() {
        console.log(this.getStringResultTemplate());
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle extends Shape implements ShapePrinter {
    private readonly length: number;
    private readonly width: number;

    constructor(color: Color, name: string, length: number, width: number) {
        super(color, name);
        this.length = length;
        this.width = width;
    }

    calculateArea(): number {
        return this.length * this.width;
    }

    print() {
        console.log(this.getStringResultTemplate());
    }
}

class Square extends Shape {
    private readonly side: number;

    constructor(color: Color, name: string, side: number) {
        super(color, name);
        this.side = side;
    }

    calculateArea(): number {
        return Math.pow(this.side, 2);
    }
}

class Triangle extends Shape {
    private readonly _sideA: number;
    private readonly _sideB: number;
    private readonly _sideC: number;

    constructor(color: Color, name: string, sideA: number, sideB: number, sideC: number) {
        super(color, name);
        this._sideA = sideA;
        this._sideB = sideB;
        this._sideC = sideC;
    }

    calculateArea(): number {
        const p = (this.sideA + this.sideB + this.sideC) / 2;

        return Math.sqrt(p * (p - this.sideA) * (p - this.sideB) * (p - this.sideC));
    }


    get sideA(): number {
        return this._sideA;
    }

    get sideB(): number {
        return this._sideB;
    }

    get sideC(): number {
        return this._sideC;
    }
}

const circle = new Circle(Color.BLACK, "circle", 5);
circle.print();

const rectangle = new Rectangle(Color.RED, "rectangle", 10, 15);
rectangle.print();

const square = new Square(Color.GREEN, "square", 5);
console.log(`Area of ${square.name}: ${square.calculateArea()}`);

const triangle = new Triangle(Color.BLACK, "triangle", 5, 6, 7);
console.log(`Area of ${triangle.name}: ${triangle.calculateArea()}`);