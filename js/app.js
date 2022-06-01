// Book class : Represents a book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// ui class : handle ui tasks
class Ui {
  static displayBooks() {
    const books = LocalStorage.getBooks();

    books.forEach((book) => Ui.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const htmlRow = document.createElement("tr");

    htmlRow.innerHTML = `
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td id = "book-isbn">${book.isbn}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete">X</a>  </td>
    `;

    list.appendChild(htmlRow);
  }

  static removeBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  // <div class = "alert alert-danger "></div>

  static showAlerts(message, className) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${className}`;
    alertDiv.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(alertDiv, form);

    // disapppear after 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// storeage class : to take care of the strage

class LocalStorage {
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
    const books = LocalStorage.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = LocalStorage.getBooks();
    books.forEach((el, idx) => {
      console.log(el.isbn === isbn, isbn, el.isbn);
      if (el.isbn == isbn) {
        books.splice(idx, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// events : Display a book
document.addEventListener("DOMContentLoaded", Ui.displayBooks);

// Event  : Add a book

document.querySelector("#book-form").addEventListener("submit", function (e) {
  // prevent default submission
  e.preventDefault();

  //   get values of the book
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //   validate
  if (title === "" || author === "" || isbn === "") {
    Ui.showAlerts("Please fill all the fields", "danger");
  } else {
    // instantate a new book
    const book = new Book(title, author, isbn);

    //   add book to ui
    Ui.addBookToList(book);

    // add a book to local stoarage
    LocalStorage.addBook(book);

    //  show success message
    Ui.showAlerts("Book Added", "success");

    //   clear the fields
    Ui.clearFields();
  }
});

// Event : Remove a book

document.querySelector("#book-list").addEventListener("click", function (e) {
  // remove book from ui
  Ui.removeBook(e.target);

  // remove book local storage;
  LocalStorage.removeBook(
    e.target.parentElement.parentElement.children["book-isbn"].textContent
  );

  //   show success message
  Ui.showAlerts("Book Removed", "success");
});
