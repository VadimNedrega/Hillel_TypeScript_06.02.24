//функція getAllBooks()
function getAllBooks() {
    const bookList: Book[] = [];

    bookArr1.map((book) => {
        const bookObj = new Book(book.id, book.title, book.author, book.available);
        bookList.push(bookObj);
        bookObj.category = setCategoryForBook(bookObj);
    });

    return bookList;
}

//функція logFirstAvailable()
function logFirstAvailable(booksArray: Book[]) {
    console.log(`Array has length: ${booksArray.length}`);
    console.log(`First's book name: ${booksArray.at(0)?.title}`);
}

//функція getBookTitlesByCategory()
function getBookTitlesByCategory(category: Category) {
    return getAllBooks().filter(book => category === book.category)
}

//функція logBookTitles()
function logBookTitles(titlesArray: String[]) {
    console.log(titlesArray);
}

//функція getBookAuthorByIndex()
function getBookAuthorByIndex(index: number) : { title: string, author: string }  {
    const book = getAllBooks()[index];
    return {title: book.title, author: book.author};
}

//функція calcTotalPages()
function calcTotalPages(){
    const libsArr: Library[] = [];

    libArr.map(lib => libsArr.push(new Library(lib.lib, BigInt(lib.books), lib.avgPagesPerBook)))

    return libsArr.reduce(
        (accum, currentValue) => accum + BigInt(currentValue.books) * BigInt(currentValue.avgPagesPerBook),
        BigInt(0)
    );
}


logFirstAvailable(getAllBooks());

console.log(getBookTitlesByCategory(Category.JavaScript))

logBookTitles(getAllBooks().map(book => book.title));

const index: number = 2
const bookByIndex = getBookAuthorByIndex(index);
console.log(`Book by index ${index}: Title - ${bookByIndex.title}, Author - ${bookByIndex.author}`);

console.log(`Total pages in all libraries: ${calcTotalPages()}`);