let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Sample initial books
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 443, true);
addBookToLibrary("The Razor's Edge", "W. Somerset Maugham", 314, false);


const books = document.querySelector(".books");
const addBookBtn = document.querySelector("#addBookBtn");
const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("#bookForm");

// Show dialog modal when clicking NEW BOOK button.
addBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

// Handle form submission
bookForm.addEventListener("submit", (e) => {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title, author, pages, read);
  displayLibrary();
});

// Delete a book and toggle the read status of a book
books.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.closest(".book-card").dataset.index;
    deleteBook(index);
  } else if (e.target.classList.contains("read-btn")) {
    const index = e.target.closest(".book-card").dataset.index;
    toggleReadStatus(index);
  }
});

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  displayLibrary();
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.index = index;

  bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="delete-btn">Delete</button>
      <button class="read-btn">Toggle Read Status</button>
    `;

  return bookCard;
}

function displayLibrary() {
  books.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    books.appendChild(bookCard);
  });
}

displayLibrary();