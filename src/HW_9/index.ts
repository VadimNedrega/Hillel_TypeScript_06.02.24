{
    type BookOrMagazine = Book | Magazine;

    class Shelf {
        constructor(public items: BookOrMagazine [] = []) {}

        add(item: BookOrMagazine) {
            this.items.push(item);
        }

        getFirst() {
            return this.items[0];
        }

        printTitles(){
            this.items.forEach(item => console.log(item instanceof Book ? `Book: ${item.title}` : `Magazine: ${item.title}`))
        }

        //В цьому випадку TypeScript не може розділити методи класу за допомогою перевантаження функцій, як це робить JavaScript, тому помилка
        // find(id: number){
        //     console.log(this.items.filter(item => item.id === id));
        // }
        //
        // find(author: string){
        //     console.log(this.items.filter(item => item.author === author));
        // }

        find(param: number | string) : void {
            typeof param === "number"
                ? console.log(this.items.filter(item => item instanceof Book && item.id === param))
                : console.log(this.items.filter(item => 'title' in item && 'publisher' in item && item.publisher === param));
        }
    }

    const bookShelf = new Shelf();
    inventory.forEach(inv =>
        bookShelf.add(new Book(inv.id, inv.title, inv.author, inv.available, inv.category))
    );

    const magazineShelf = new Shelf();
    magazines.forEach(mag => {
        magazineShelf.add(mag);
    })

    console.log("________________HW_9_________________")
    bookShelf.printTitles();
    magazineShelf.printTitles();

    bookShelf.find(10);
    magazineShelf.find("GSU");
}