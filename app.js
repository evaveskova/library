const myLibrary = [
  { title: 'Harry Potter', author: 'J.K. Rowling', pages: 394, status: false }
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

const bookForm = document.forms['book-form'];
bookForm.addEventListener('submit', function(e){
  e.preventDefault();

  const data = Object.fromEntries(new FormData(bookForm).entries());
  addToLibrary(data)
  render(myLibrary);
  bookForm.reset();
});

let render = (array) => {
  /* jshint ignore:start*/
  const area = document.getElementById('book-area');
  /* jshint ignore:end */
  area.innerHTML = '';
  array.forEach((book, i) => {
    let div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-index', `${i}`);
    /* jshint ignore:start*/
    const heading = document.createElement('h1');
    /* jshint ignore:end*/
    heading.classList.add('card-title');
    heading.textContent = book.title;
    div.appendChild(heading);
    /* jshint ignore:start*/
    const writer = document.createElement('p');
    /* jshint ignore:end*/
    writer.textContent = `Author:  + ${book.author}`;
    div.appendChild(writer);
    /* jshint ignore:start*/
    const pgNo = document.createElement('p');
    /* jshint ignore:end*/
    pgNo.textContent = `No. of pages: ' + ${book.pages}`;
    div.appendChild(pgNo);
    /* jshint ignore:start*/
    let deleteBtn = document.createElement('button');
    /* jshint ignore:end*/
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('d-btn');
    div.appendChild(deleteBtn);

    const readSwitch = document.createElement('input');
    readSwitch.setAttribute('type', 'checkbox');
    readSwitch.setAttribute('data-check', `${i}`);
    readSwitch.classList.add('switch');
    div.appendChild(readSwitch);
    /* jshint ignore:start*/
    const switchlabel = document.createElement('label');
    /* jshint ignore:end */
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
