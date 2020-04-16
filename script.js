const library = [];
const btn = document.getElementById('btn');
const bookTable = document.getElementById('bookTable');

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
    status.innerHTML = e.status;
    let del = document.createElement('button');
    del.innerHTML = 'X';
    del.setAttribute('class', 'del');
    del.setAttribute('id', library.indexOf(e) + 'x');
    del.addEventListener('click', function () {
      let node = document.getElementById(library.indexOf(e) + 'x');
      node.parentNode.parentNode.removeChild(node.parentNode);
    });
    bookTable.appendChild(row);
    document.getElementById(library.indexOf(e)).appendChild(title);
    document.getElementById(library.indexOf(e)).appendChild(author);
    document.getElementById(library.indexOf(e)).appendChild(pages);
    document.getElementById(library.indexOf(e)).appendChild(status);
    document.getElementById(library.indexOf(e)).appendChild(del);
  });
}

btn.addEventListener('click', function () {
  let title = prompt('Title: ');
  let author = prompt('Author: ');
  let pages = prompt('Pages: ');
  let status = prompt('Status: ');
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
render();
