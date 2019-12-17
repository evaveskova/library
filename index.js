let myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

var addToLibrary = (title, author, pages) => { 
  let obj = new Book(title, author, pages);
  return myLibrary.push(obj);
}


