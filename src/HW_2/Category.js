"use strict";
var Category;
(function (Category) {
    Category["JavaScript"] = "JavaScript";
    Category["CSS"] = "CSS";
    Category["HTML"] = "HTML";
    Category["TypeScript"] = "TypeScript";
    Category["Angular"] = "Angular";
})(Category || (Category = {}));
function setCategoryForBook(book) {
    if (book.title.match("CSS")) {
        return Category.CSS;
    }
    if (book.title.match("HTML")) {
        return Category.HTML;
    }
    if (book.title.match("TypeScrypt")) {
        return Category.TypeScript;
    }
    if (book.title.match("Angular")) {
        return Category.Angular;
    }
    return Category.JavaScript;
}
