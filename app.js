const myLibrary = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    pages: 394,
    status: false,
  },
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
  bookForm.classList.remove('visible-form');
  bookForm.classList.add('hidden-form');
});

const openForm = document.getElementById('open-form-btn');
openForm.addEventListener('click', () => {
  bookForm.classList.remove('hidden-form');
  bookForm.classList.add('visible-form');
});

let render = (array) => {
  const area = document.getElementById('book-area');
  area.innerHTML = '';
  array.forEach((book, i) => {
    let div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-index', `${i}`);

    const heading = document.createElement('h1');
    heading.classList.add('card-title');
    heading.textContent = book.title;
    div.appendChild(heading);

    const writer = document.createElement('p');
    writer.textContent = `Author:  + ${book.author}`;
    div.appendChild(writer);

    const pgNo = document.createElement('p');
    pgNo.textContent = `No. of pages: ' + ${book.pages}`;
    div.appendChild(pgNo);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('d-btn');
    div.appendChild(deleteBtn);

    const readSwitch = document.createElement('input');
    readSwitch.setAttribute('type', 'checkbox');
    readSwitch.setAttribute('data-check', `${i}`);
    readSwitch.classList.add('switch');
    div.appendChild(readSwitch);

    const switchlabel = document.createElement('label');
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
