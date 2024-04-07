//1. Принцип єдиної відповідальності (SRP)
{
    class Book {
        constructor(
            readonly id: number,
            readonly title: string,
            readonly author: string,
        ) {
        }

        showDetails(): void {
            console.log(this)
        }
    }

    class User {
        private _vipSign: boolean;

        constructor(
            readonly id: number,
            readonly firstName: string,
            readonly lastName: string,
            readonly yearOfBirth: number,
            vipSign: boolean
        ) {
            this._vipSign = vipSign;
        }


        get vipSign(): boolean {
            return this._vipSign;
        }

        set vipSign(value: boolean) {
            this._vipSign = value;
        }
    }

    class Library {
        private _users: User [] = [];
        private _books: Book [] = [];

        constructor(
            readonly id: number,
            readonly country: string,
            readonly address: string,
        ) {
        }

        addBook(book: Book): void {
            this._books = [...this._books, book];
        }

        addUser(user: User): void {
            this._users = [...this._users, user];
        }

        showLibraryInfo(): void {
            console.log(this);
        }

        showUsers(): void {
            console.log(this._users);
        }

        showBooks(): void {
            console.log(this._books);
        }
    }
}

//2. Принцип відкритості/закритості (OCP)
{
    class Editor {
        private _shapes: Shape [] = [];
        constructor(readonly name: string) {
        }
        
        addShape(shape: Shape) : void {
            this._shapes = [...this._shapes, shape];
        }

        addShapes(shapes: Array<Shape>): void {
            this._shapes = [...this._shapes, ...shapes];
        }
        
        useShapeForDrawing(shape: Shape) : void {
            const result = this._shapes.find(target => target.name === shape.name);
            console.log(`Now shape ${result?.name.toUpperCase()} is being used for drawing`);
        }

        get shapes(): Shape[] {
            return this._shapes;
        }
    }

    //Наслідування
    abstract class Shape {
        protected constructor(public name: string) {
        }
    }
    
    class Round extends Shape{
        constructor(public override name: string) {
            super("Round")
        }
    }

    class Square extends Shape{
        constructor(public override name: string) {
            super("Square")
        }
    }

    class Triangle extends Shape{
        constructor(public override name: string) {
            super("Triangle")
        }
    }

    const round = new Round("round");
    const square = new Square("square");
    const triangle = new Triangle("triangle");

    const editor = new Editor("Paint");
    editor.addShapes(Array.of(round, square, triangle));

    //Додавання функціоналу без модифікацій минулого коду
    class Ellipse extends Shape{
        constructor(public override name: string) {
            super("Ellipse")
        }
    }

    const ellipse = new Ellipse("ellipse");
    editor.addShape(ellipse);

    editor.shapes.forEach(shape => editor.useShapeForDrawing(shape));
}

//3. Принцип підстановки Лісков (LSP). Вважаю, що реалізація вже є в п.2, але завдання є завдання
{
    class Shape {
        constructor(public name: string) {}

        getArea(): number {
            return 0;
        }
    }

    class Square extends Shape {
        constructor(public sideLength: number) {
            super("Square");
        }

        //поліморфізм
        override getArea(): number {
            return this.sideLength ** 2;
        }
    }

    class Circle extends Shape {
        constructor(public radius: number) {
            super("Circle");
        }

        override getArea(): number {
            return Math.PI * this.radius ** 2;
        }
    }

    class Triangle extends Shape {
        constructor(public base: number, public height: number) {
            super("Triangle");
        }

        override getArea(): number {
            return 0.5 * this.base * this.height;
        }
    }

    const square: Shape = new Square(12);
    const circle: Shape = new Circle(32);
    const triangle: Shape = new Triangle(43, 65);

    function printArea(shape: Shape): void {
        console.log(`Area of ${shape.name}: ${shape.getArea()}`);
    }

    printArea(square);
    printArea(circle);
    printArea(triangle);
}

//4. Принцип розділення інтерфейсу (ISP).
{
    interface ITask {
        createTask() : void;
        assignTask() : void;
        completeTask() : void;
    }

    interface IManagerTask{
        createTask() : void;
        assignTask() : void;
    }

    interface IDeveloperTask{
        completeTask() : void;
    }

    class Manager implements IManagerTask{
        createTask(): void {
            console.log("Create Task");
        }

        assignTask(): void {
            console.log("Assigning Task");
        }
        
    }

    class Developer implements IDeveloperTask{
        completeTask(): void {
            console.log("Task completed")
        }
    }
}

//5. Принцип інверсії залежностей (DIP).
{
    interface ILogger {
        log(message: string): void;
    }

    class ConsoleLogger implements ILogger {
        log(message: string): void {
            console.log(message);
        }
    }

    class FileLogger implements ILogger {
        log(message: string): void {
            console.log(message);
        }
    }

    class App {
        private logger: ILogger;

        constructor(logger: ILogger) {
            this.logger = logger;
        }

        run(): void {
            this.logger.log('Application is running');
        }
    }

    const app1 = new App(new ConsoleLogger());
    const app2 = new App(new FileLogger());

    app1.run();
    app2.run();
}