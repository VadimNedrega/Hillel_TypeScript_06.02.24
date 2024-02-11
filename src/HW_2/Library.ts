class Library {
    lib: string;
    books: bigint;
    avgPagesPerBook: number;

    constructor(lib: string, books: bigint, avgPagesPerBook: number) {
        this.lib = lib;
        this.books = books;
        this.avgPagesPerBook = avgPagesPerBook;
    }
}