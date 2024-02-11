"use strict";
class Book {
    constructor(id, title, author, available) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.available = available;
    }
    set category(value) {
        this._category = value;
    }
    get category() {
        return this._category;
    }
}
