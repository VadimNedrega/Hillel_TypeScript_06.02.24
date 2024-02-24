enum ColorUpgraded {
    RED,
    GREEN,
    BLACK
}

abstract class ShapeUpgraded {
    protected constructor(private readonly _color: ColorUpgraded, private readonly _name: string) {}

    protected abstract calculateArea(): number;

    get name(): string{
        return this._name;
    }

    protected getStringResultTemplate(): string {
        return `The result of calculation for ${this.name} and color: ${this._color}: ${this.calculateArea()}`
    }
}

interface ShapePrinterUpgraded {
    print(): void;
}

class CircleUpgraded extends ShapeUpgraded implements ShapePrinterUpgraded {
    constructor(color: ColorUpgraded, name: string, private readonly _radius: number) {
        super(color, name);
    }

    print() {
        console.log(this.getStringResultTemplate());
    }

    override calculateArea(): number {
        return Math.PI * Math.pow(this._radius, 2);
    }
}

class RectangleUpgraded extends ShapeUpgraded implements ShapePrinterUpgraded {
    constructor(color: ColorUpgraded, name: string, private readonly _length: number, private readonly _width: number) {
        super(color, name);
    }

    override calculateArea(): number {
        return this._length * this._width;
    }

    print() {
        console.log(this.getStringResultTemplate());
    }
}

class SquareUpgraded extends ShapeUpgraded {
    constructor(color: ColorUpgraded, name: string, private readonly _side: number) {
        super(color, name);
    }

    override calculateArea(): number {
        return Math.pow(this._side, 2);
    }
}

class TriangleUpgraded extends ShapeUpgraded {
    constructor(
        color: ColorUpgraded, name: string, private readonly _sideA: number,
        private readonly _sideB: number, private readonly _sideC: number
    ) {
        super(color, name);
    }

    override calculateArea(): number {
        const p = (this._sideA + this._sideB + this._sideC) / 2;

        return Math.sqrt(p * (p - this._sideA) * (p - this._sideB) * (p - this._sideC));
    }
}

const circleUpgraded = new CircleUpgraded(ColorUpgraded.RED, "circle", 5);
circleUpgraded.print();

const rectangleUpgraded = new RectangleUpgraded(ColorUpgraded.RED, "rectangle", 10, 15);
rectangleUpgraded.print();

const squareUpgraded = new SquareUpgraded(ColorUpgraded.GREEN, "square", 5);
console.log(`Area of ${squareUpgraded.name}: ${squareUpgraded.calculateArea()}`);

const triangleUpgraded = new TriangleUpgraded(ColorUpgraded.BLACK, "triangle", 5, 6, 7);
console.log(`Area of ${triangleUpgraded.name}: ${triangleUpgraded.calculateArea()}`);