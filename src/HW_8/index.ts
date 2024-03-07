enum Category {
    Software
}

class Book {
    constructor(public id: number, public title: string, public author: string, public available: boolean, public category: Category) {
    }
}

function purge<T>(array: T[]): T[] {
    return array.slice(2, array.length)
}

const inventory = [

    {id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software},

    {id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software},

    {id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software},

    {id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software}

];

console.log(purge(inventory));
console.log(purge([1, 2, 3, 4, 5, 6]));

const purgeNumbers = purge<number>;
console.log(purgeNumbers([1, 2, 3, 4, 5, 6]));

// console.log(purgeNumbers(["1", "2"])); помилка, т.к. тип string не сумісний з number

interface Magazine {
    title: string,
    publisher: string,
}

class Shelf<T> {
    constructor(readonly items: T[]) {
        this.items = items;
    }

    add(item: T) {
        this.items.push(item);
    }

    getFirst() {
        return this.items[0];
    }
}

const bookShelf = new Shelf<Book>([]);
inventory.forEach(inv =>
    bookShelf.add(new Book(inv.id, inv.title, inv.author, inv.available, inv.category))
);

console.log(bookShelf.getFirst().title);

const magazines = [

    { title: 'Programming Language Monthly', publisher: 'Code Mags' },

    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },

    { title: 'Five Points', publisher: 'GSU' }

];

const magazineShelf = new Shelf<Magazine>(magazines.map(item => ({
    title: item.title,
    publisher: item.publisher
})));

console.log(magazineShelf.items[0]);

interface CallbackFn<T> {
    (err: Error | null, data: T | null): void;
}

function fetchData(callback: CallbackFn<Book>): void {
    const error: Error | null = null;
    const data: Book | null = bookShelf.getFirst();
    callback(error, data);
}

fetchData((error, data) => {
    error ? console.error("Error:", error.message) : console.log("Response:", data);
});