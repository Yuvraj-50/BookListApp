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
    const storedBooks = [
      {
        title: "Book One",
        author: "Yuvraj",
        isbn: "222222",
      },

      {
        title: "Book two ",
        author: "Yuvraj 2",
        isbn: "29728728972897",
      },
    ];

    const books = storedBooks;

    books.forEach((book) => Ui.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const htmlRow = document.createElement("tr");

    htmlRow.innerHTML = `
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.isbn}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete">X</a>  </td>
    `;

    list.appendChild(htmlRow);
  }

  static removeBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlerts(message, className) {}

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// storeage : to take care of the strage

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
    alert("pls enter the value");
  } else {
    // instantate a new book
    const book = new Book(title, author, isbn);

    //   add book to ui
    Ui.addBookToList(book);

    //   clear the fields
    Ui.clearFields();
  }
});

// Event : Remove a book

document.querySelector("#book-list").addEventListener("click", function (e) {
  Ui.removeBook(e.target);
});
