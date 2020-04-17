let library = [];
const btn = document.getElementById('btn');
const bookTable = document.getElementById('bookTable');

function populateStorage() {
  library.forEach((book) => {
    localStorage.setItem(book.title, book);
  });
}

function populateLibrary() {
  for (let i = 0; i < localStorage.length; i++) {
    let book = localStorage.getItem(localStorage.key(i));
    if (book.title !== undefined) {
      library.push(book);
    }
  }
}

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${status}`;
  };
}

function addBookToLibrary(book) {
  library.push(book);
}

function render() {
  bookTable.innerHTML =
    '<tr><th>Title</th><th>Author</th><th>Pages</th><th>Status</th></tr>';
  library.forEach((e) => {
    let row = document.createElement('tr');
    row.setAttribute('id', library.indexOf(e));
    let title = document.createElement('td');
    title.innerHTML = e.title;
    let author = document.createElement('td');
    author.innerHTML = e.author;
    let pages = document.createElement('td');
    pages.innerHTML = e.pages;
    let status = document.createElement('td');
    status.innerHTML = `<button class='status' id=${library.indexOf(e) + 's'}>${
      e.status
    }</button>`;
    let del = document.createElement('button');
    del.innerHTML = 'X';
    del.setAttribute('class', 'del');
    del.setAttribute('id', library.indexOf(e) + 'x');
    del.addEventListener('click', function () {
      localStorage.removeItem(title);
      let node = document.getElementById(library.indexOf(e) + 'x');
      node.parentNode.parentNode.removeChild(node.parentNode);
    });
    bookTable.appendChild(row);
    document.getElementById(library.indexOf(e)).appendChild(title);
    document.getElementById(library.indexOf(e)).appendChild(author);
    document.getElementById(library.indexOf(e)).appendChild(pages);
    document.getElementById(library.indexOf(e)).appendChild(status);
    document.getElementById(library.indexOf(e)).appendChild(del);
    let btn = document.getElementById(`${library.indexOf(e) + 's'}`);
    btn.addEventListener('click', function () {
      if (btn.innerHTML === 'read') {
        btn.innerHTML = 'not read yet';
      } else if (btn.innerHTML === 'not read yet') {
        btn.innerHTML = 'read';
      }
    });
  });
}

btn.addEventListener('click', function () {
  let title = prompt('Title: ');
  let author = prompt('Author: ');
  let pages = prompt('Pages: (please enter a number)');
  while (isNaN(parseInt(pages))) {
    pages = prompt('Pages: (please enter a number)');
  }
  let read = prompt('Finished reading: (please enter true or false)');
  let status;
  while (read !== 'true' && read !== 'false') {
    read = prompt('Finished reading: (please enter true or false)');
  }
  if (read === 'true') {
    status = 'read';
  } else if (read === 'false') {
    status = 'not read yet';
  }
  addBookToLibrary(new Book(title, author, pages, status));
  render();
});

let sorcererStone = new Book(
  "Harry Potter and the Sorcerer's Stone",
  'J. K. Rowling',
  223,
  'read'
);
let chamberSecrets = new Book(
  'Harry Potter and the Chamber of Secrets',
  'J. K. Rowling',
  251,
  'not read yet'
);
let prisonerAzkaban = new Book(
  'Harry Potter and the Prisoner of Azkaban',
  'J. K. Rowling',
  317,
  'not read yet'
);

addBookToLibrary(sorcererStone);
addBookToLibrary(chamberSecrets);
addBookToLibrary(prisonerAzkaban);

if (!localStorage.getItem('lib')) {
  populateStorage();
  // console.log('not yet...');
} else {
  populateLibrary();
  // console.log('yes!');
}

render();
