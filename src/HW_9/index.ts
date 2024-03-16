{
    class Shelf {
        constructor(public items: (Book [] | Magazine []) = []) {
        }

        add(item: Book | Magazine) {
            if (item instanceof Book && this.items.every(book => book instanceof Book)) {
                (this.items as Book[]).push(item);
            } else if ('publisher' in item && this.items.every(magazine => 'publisher' in magazine && 'title' in magazine)) {
                (this.items as Magazine[]).push(item);
            } else {
                throw new Error("Wrong Type. Must be Book or Magazine")
            }
        }

        getFirst() {
            return this.items[0];
        }

        printTitles() {
            this.items.forEach(item => console.log(item instanceof Book ? `Book: ${item.title}` : `Magazine: ${item.title}`))
        }

        find(param: number | string): void {
            typeof param === "number"
                ? console.log(this.items.filter(item => item instanceof Book && item.id === param))
                : console.log(this.items.filter(item => 'title' in item && 'publisher' in item && item.publisher === param));
        }
    }

    const bookShelf = new Shelf();
    inventory.forEach(inv =>
        bookShelf.add(new Book(inv.id, inv.title, inv.author, inv.available, inv.category))
    );

    //bookShelf.add({title: "", publisher: ""}) помилка додавання Magazine у масив Book

    const magazineShelf = new Shelf();
    magazines.forEach(mag => {
        magazineShelf.add(mag);
    })

    magazineShelf.add({title: "new Title", publisher: "000"});

    console.log("________________HW_9_________________")
    bookShelf.printTitles();
    magazineShelf.printTitles();

    bookShelf.find(10);
    magazineShelf.find("GSU");
}