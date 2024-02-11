class Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    private _category: Category | undefined;

    constructor(id: number, title: string, author: string, available: boolean) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.available = available;
    }

    set category(value: Category) {
        this._category = value;
    }

    get category(): Category | undefined {
        return this._category;
    }
}