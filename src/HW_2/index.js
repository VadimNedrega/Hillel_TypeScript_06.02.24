"use strict";
//функція getAllBooks()
function getAllBooks() {
    const bookList = [];
    bookArr1.map((book, category) => {
        const bookObj = new Book(book.id, book.title, book.author, book.available);
        bookList.push(bookObj);
        bookObj.category = setCategoryForBook(bookObj);
    });
    return bookList;
}
//функція logFirstAvailable()
function logFirstAvailable(booksArray) {
    console.log(`Array has length: ${booksArray.length}`);
    console.log(`First's book name: ${booksArray.at(0)?.title}`);
}
//функція getBookTitlesByCategory()
function getBookTitlesByCategory(category) {
    return getAllBooks().filter(book => category === book.category);
}
//функція logBookTitles()
function logBookTitles(titlesArray) {
    console.log(titlesArray);
}
//функція getBookAuthorByIndex()
function getBookAuthorByIndex(index) {
    const book = getAllBooks()[index];
    return { title: book.title, author: book.author };
}
//функція calcTotalPages()
function calcTotalPages() {
    const libsArr = [];
    libArr.map(lib => libsArr.push(new Library(lib.lib, BigInt(lib.books), lib.avgPagesPerBook)));
    return libsArr.reduce((accum, currentValue) => accum + BigInt(currentValue.books) * BigInt(currentValue.avgPagesPerBook), BigInt(0));
}
logFirstAvailable(getAllBooks());
console.log(getBookTitlesByCategory(Category.JavaScript));
logBookTitles(getAllBooks().map(book => book.title));
const index = 2;
const bookByIndex = getBookAuthorByIndex(index);
console.log(`Book by index ${index}: Title - ${bookByIndex.title}, Author - ${bookByIndex.author}`);
console.log(`Total pages in all libraries: ${calcTotalPages()}`);
