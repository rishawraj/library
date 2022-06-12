// modal
document.querySelector("#addButton").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("active");
});
function closeModal() {
  document.querySelector(".modal").classList.remove("active");
}
document.getElementById("close-btn").addEventListener("click", closeModal);
// Book Constructor
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

//* UI class
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    // console.log(books);
    books.forEach((book) => UI.addBookToGrid(book));
  }

  static addBookToGrid(book) {
    const grid = document.querySelector(".library-grid");

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
    <p>title: ${book.title}</p>
    <p>author: ${book.author}</p>
    <p>pages: ${book.pages}</p>
    <button id="delete">remove</button>
   `;

    const readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    div.appendChild(readBtn);
    if (book.isRead === true) {
      readBtn.textContent = "read";
      readBtn.style.backgroundColor = "green";
    } else {
      readBtn.textContent = "not read";
      readBtn.style.backgroundColor = "red";
    }
    grid.appendChild(div);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#readStatus").checked = false;
  }

  static removeBook(et) {
    // console.log(et.parentElement);
    et.parentElement.remove();
  }
}

// Store
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    // console.log(books);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(et) {
    const title = et.parentElement.firstElementChild.textContent.replace(
      /title: /,
      ""
    );

    const books = JSON.parse(localStorage.getItem("books"));

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// add new book from form
const form = document.querySelector("#book-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#readStatus").checked;

  const book = new Book(title, author, pages, isRead);
  // add book to UI
  UI.addBookToGrid(book);
  // add to localstorage
  Store.addBook(book);
  // clear fields
  UI.clearFields();
  // close modal
  closeModal();
});

// remove book
document.querySelector(".library-grid").addEventListener("click", (e) => {
  // console.log(e.target.id);
  if (e.target.id === "delete") {
    UI.removeBook(e.target);
    Store.removeBook(e.target);
  }
});

// toggle read status
document.querySelector(".library-grid").addEventListener("click", (e) => {
  // console.log(e.target.classList[0]);
  if (e.target.classList[0] === "readBtn") {
    const title = e.target.parentElement.firstElementChild.textContent.replace(
      /title: /,
      ""
    );
    const books = Store.getBooks();

    books.forEach((book) => {
      if (book.title === title) {
        if (book.isRead == true) {
          book.isRead = false;
        } else {
          book.isRead = true;
        }
      }
    });
    // console.log(books);
    localStorage.setItem("books", JSON.stringify(books));
    render();
  }
});

function render() {
  const books = Store.getBooks();
  // reset
  document.querySelector(".library-grid").innerHTML = "";

  books.forEach((book) => {
    const grid = document.querySelector(".library-grid");

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
    <p>title: ${book.title}</p>
    <p>author: ${book.author}</p>
    <p>pages: ${book.pages}</p>
    <button id="delete">remove</button>
   `;

    const readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    div.appendChild(readBtn);
    if (book.isRead === true) {
      readBtn.textContent = "read";
      readBtn.style.backgroundColor = "green";
    } else {
      readBtn.textContent = "not read";
      readBtn.style.backgroundColor = "red";
    }
    grid.appendChild(div);
  });
}
