// 1
interface IExample1 {
    [key: string]: number | string;
}

class Example1 implements IExample1{
    [key: string]: number | string;

    constructor(public readonly name: string, public readonly age: number) {
        this.name = name;
        this.age = age;
    }
}

const example1 : Example1 = new Example1("name", 45);
const example1_obj : IExample1 = {
    surname: "Surname",
    father: "Father",
    salary: 1_000_000,
}

console.log(example1);
console.log(example1_obj);

// 2
interface IExample2 {
    [key: string]: (...args: any[]) => any;
}

class Example2 implements IExample2{
    [key: string]: (...args: any[]) => any;

    greet(name: string): void {
        console.log(`Hello, ${name}!`);
    }

    sum(a: number, b: number): number {
       return a + b;
    }
}

const example2: Example2 = new Example2();
const example2_obj: IExample2 = {
    logObj(obj: object) : void {
        console.log(JSON.stringify(obj));
    }
}

console.log(example2.sum(2, 2));
example2.greet("User");
example2_obj.logObj({name: "Name"});

// 3
interface IExample3<T> {
    [index: number]: T;
}

class Example3 implements IExample3<string>{
    [index: number]: string;

    constructor() {
        this[0] = "string1";
        this[1] = "string2";
        this[2] = "string3";
    }
}

const example3: Example3 = new Example3();
const example3_obj: IExample3<bigint> = {
    0: BigInt(12),
    1: BigInt(67),
    2: BigInt(1),
}

console.log(example3[0]);
console.log(Object.keys(example3).length);
console.log(example3_obj[1]);
console.log(Object.keys(example3_obj).length);

// 4
interface IExample4 {
    name: string;
    [key: string]: any;
}

class Example4 implements IExample4 {
    [key: string]: any;
    name: string = "New string";

    surname: string = "Surname";
}

const example4: Example4 = new Example4();
const example4_obj: IExample4 = {
    name: "Override name",
    father: "Father",
};

console.log(example4);
console.log(example4_obj);

// 5
interface IExample5 {
    [key: string]: any;
}

interface IExample5Extended extends IExample5{
    name: string;
}

class Example5 implements IExample5Extended{
    [key: string]: any;
    name: string = "New str";
}

const example5: Example5 = new Example5();
const example5_obj: IExample5Extended = {
    name: "Override name",
    surname: "Added surname",
}

console.log(example5);
console.log(example5_obj);

// 6
interface IExample6 {
    [key: string]: any;
}

function isAllValuesNumbers(obj: IExample6): boolean {
    for (const key of Object.keys(obj)) {
        if (typeof obj[key] !== 'number') {
            return false;
        }
    }

    return true;
}

const example6_1: IExample6 = {
    a: 1,
    b: 2,
    c: 3
}

const example6_2: IExample6 = {
    a: "String!",
    b: 2,
    c: BigInt(789),
};

console.log(isAllValuesNumbers(example6_1));
console.log(isAllValuesNumbers(example6_2));