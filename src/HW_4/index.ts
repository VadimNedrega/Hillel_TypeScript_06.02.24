//1
interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;

    //8
    markDamaged?: DamageLogger;
}

//2
function printBook(book: Book) {
    console.log(`${book.title} by ${book.author}`)
}

//3
const myBook: Book = {
    id: 5,

    title: 'Colors, Backgrounds, and Gradients',

    author: 'Eric A. Meyer',

    available: true,

    category: Category.CSS,

    pages: 200,

    markDamaged (reason: string) {
        console.log(`Damaged: ${reason}`)
    },
}

printBook(myBook);

//4, 5 - Видалені властивості year, copies. Додана необов'язкова властивість pages: 200.

//6
myBook.markDamaged?.("missing back cover");

//7
interface DamageLogger {
    (reason: string): void;
}

//9
interface Person {
    name: string;
    email: string;
}

//10
interface Author extends Person{
    numBooksPublished: number;
}

//11
interface Librarian extends Person{
    department: string;
    assistCustomer(custName: string, bookTitle: string): void;
}