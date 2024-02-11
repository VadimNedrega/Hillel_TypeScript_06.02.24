enum Category {
    JavaScript = "JavaScript",
    CSS = "CSS",
    HTML = "HTML",
    TypeScript = "TypeScript",
    Angular = "Angular"
}

function setCategoryForBook(book: Book) {
    if (book.title.match("CSS")){
        return Category.CSS;
    }

    if (book.title.match("HTML")){
        return Category.HTML;
    }

    if (book.title.match("TypeScrypt")){
        return Category.TypeScript;
    }

    if (book.title.match("Angular")){
        return Category.Angular;
    }

    return Category.JavaScript;
}