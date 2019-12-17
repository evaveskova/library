debugger;

let myLibrary = [{title: "newspaper", author: "those guys", pages: 100}];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

// var bookForm = document.forms['book-form'];
var bookTitle = document.getElementsByClassName("title").value;
var bookAuthor = document.getElementsByClassName('author').value;
var bookPages = document.getElementsByClassName('pages').value;

var addToLibrary = (title, author, pages) => {
  title = bookTitle;
  author = bookAuthor;
  pages = bookPages;

  let obj = new Book(title, author, pages);
  return myLibrary.push(obj);
}

const bookForm = document.forms['book-form'];
bookForm.addEventListener('submit', function(e){
  e.preventDefault();

  const value = bookForm.querySelectorAll('input[type="text"]')

});


var render = (array) => {

  array.forEach(book => {
    var div = document.createElement('div');
    div.classList.add('card');

    var heading = document.createElement("h1");
    heading.classList.add("card-title");
    heading.textContent = book.title;
    div.appendChild(heading);

    var writer = document.createElement("p");
    writer.textContent = "Author: " + book.author;
    div.appendChild(writer);

    var pgNo = document.createElement("p");
    pgNo.textContent = "No. of pages: " + book.pages;
    div.appendChild(pgNo);

    var area = document.getElementById("book-area");
    area.appendChild(div);
  })
}

render(myLibrary);
