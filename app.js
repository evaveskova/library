const myLibrary = [
  { 
    title: 'Harry Potter', 
    author: 'J.K. Rowling', 
    pages: 394, 
    status: false 
  }
];
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = false;
  }
}
let addToLibrary = ({title, author, pages}) => {

  let obj = new Book(title, author, pages);
  return myLibrary.push(obj);
}
/* eslint-enable */
const bookForm = document.forms['book-form'];
/*eslint-disable */
bookForm.addEventListener('submit', function(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(bookForm).entries());
  addToLibrary(data)
  render(myLibrary);
  bookForm.reset();
});
let render = (array) => {
  /* eslint-enable */
  const area = document.getElementById('book-area');
  /* eslint-disable */
  area.innerHTML = '';
  array.forEach((book, i) => {
    /*eslint-enable */
    let div = document.createElement('div');
    /*eslint-disable */
    div.classList.add('card');
    div.setAttribute('data-index', `${i}`);
    /* eslint-enable */
    const heading = document.createElement('h1');
    /* eslint-disable */
    heading.classList.add('card-title');
    heading.textContent = book.title;
    div.appendChild(heading);
    /* eslint-enable */
    const writer = document.createElement('p');
    /* eslint-disable */
    writer.textContent = `Author:  + ${book.author}`;
    div.appendChild(writer);
    /* eslint-enable */
    const pgNo = document.createElement('p');
    /* eslint-disable */
    pgNo.textContent = `No. of pages: ' + ${book.pages}`;
    div.appendChild(pgNo);
    /* eslint-enable */
    const deleteBtn = document.createElement('button');
    /* eslint-disable */
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('d-btn');
    div.appendChild(deleteBtn);
    /* eslint-enable */
    const readSwitch = document.createElement('input');
    /* eslint-disable */
    readSwitch.setAttribute('type', 'checkbox');
    readSwitch.setAttribute('data-check', `${i}`);
    readSwitch.classList.add('switch');
    div.appendChild(readSwitch);
    /* eslint-enable */
    const switchlabel = document.createElement('label');
    /* eslint-disable */
    switchlabel.classList.add('slider');
    switchlabel.textContent = 'Status: Not Read';
    div.appendChild(switchlabel);
    area.appendChild(div);
    const deleteEntry = (entry) => {
      if (entry.classList.contains('d-btn')) {
        entry.parentElement.remove();
      }
    };
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      deleteEntry(e.target);
      const value = e.target.parentElement.dataset.index;
      delete myLibrary[value];
    });
    readSwitch.addEventListener('change', (e) => {
      if (e.target.checked) {
        e.target.nextSibling.textContent = 'Status: Read';
        const checkedVal = e.target.parentElement.dataset.index;
        myLibrary[checkedVal].status = true;
      } else {
        e.target.nextSibling.textContent = 'Status: Not Read';
        const checkedVal = e.target.parentElement.dataset.index;
        myLibrary[checkedVal].status = false;
      }
    });
  });
}
render(myLibrary);
