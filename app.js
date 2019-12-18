debugger;

let myLibrary = [{title: "newspaper", author: "those guys", pages: 100}];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

let addToLibrary = ({title, author, pages}) => {

  let obj = new Book(title, author, pages);
  return myLibrary.push(obj);
}

const bookForm = document.forms['book-form'];
bookForm.addEventListener('submit', function(e){
  e.preventDefault();

  const data = Object.fromEntries(new FormData(bookForm).entries());
  addToLibrary(data)
  render(myLibrary);
  bookForm.reset();
});

let render = (array) => {
  let area = document.getElementById("book-area");
  area.innerHTML = "";
  array.forEach((book, i) => {
    let div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-index', `${i}`);

    let heading = document.createElement("h1");
    heading.classList.add("card-title");
    heading.textContent = book.title;
    div.appendChild(heading);

    let writer = document.createElement("p");
    writer.textContent = "Author: " + book.author;
    div.appendChild(writer);

    let pgNo = document.createElement("p");
    pgNo.textContent = "No. of pages: " + book.pages;
    div.appendChild(pgNo);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add("d-btn");
    div.appendChild(deleteBtn);

    let readSwitch = document.createElement("input");
    readSwitch.setAttribute('type', 'checkbox');
    readSwitch.setAttribute('data-check', `${i}`);
    readSwitch.classList.add('switch');
    div.appendChild(readSwitch);

    let switchSpan = document.createElement("span");
    switchSpan.classList.add('slider');
    div.appendChild(switchSpan);

    area.appendChild(div);
  })
}

let deleteEntry = (entry) => {
  if (entry.classList.contains('d-btn')) {
    entry.parentElement.remove();
  }
}

document.querySelector('#book-area').addEventListener('submit', (e) => {
  e.preventDefault();
  deleteEntry(e.target);
  let value = e.target.parentElement.dataset.index;
  delete myLibrary[value];
});

document.querySelector('#book-area').addEventListener("change", function (e) {
  if (e.target.checked) {
    e.target.nextSibling.textContent = "read";
  } else {
    e.target.nextSibling.textContent = "not-read";
  }
});

render(myLibrary);
