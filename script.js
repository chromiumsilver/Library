const TOGGLE_READ_BACKGROUND_COLOR = "#d4edda";
const TOGGLE_READ_COLOR = "#155724";
const TOGGLE_UNREAD_BACKGROUND_COLOR = "#f8d7da";
const TOGGLE_UNREAD_COLOR = "#721c24";
const TOGGLE_READ_HOVER_COLOR = "#c3e6cb";
const TOGGLE_UNREAD_HOVER_COLOR = "#f5c6cb";

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

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  displayLibrary();
}

// Function to create a DOM element for a book card
function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.index = index;

  bookCard.innerHTML = `
      <h2 class="book-title">${book.title}</h2>
      <div class="book-author">Author: ${book.author}</div>
      <div class="book-details">Pages: ${book.pages}</div>
      <button class="toggle-read-btn ${book.read ? "read" : "unread"}">
        ${book.read ? "Read" : "Not Read"}
      </button>
      <button class="delete-btn">Delete</button>
    `;

  return bookCard;
}

// Function to display all books in the library
function displayLibrary() {
  books.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    books.appendChild(bookCard);
  });
}

// Add sample books to the library
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 443, true);
addBookToLibrary("The Razor's Edge", "W. Somerset Maugham", 314, false);


const books = document.querySelector(".books");
const newBookBtn = document.querySelector("#newBookBtn");
const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("#bookForm");
const CancelBtn = document.querySelector("#cancelBtn");

// Show dialog modal when clicking NEW BOOK button.
newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

// Close the dialog when clicking Cancel button
CancelBtn.addEventListener("click", () => {
  bookDialog.close();
})

// Close the dialog when clicking outside the modal
window.addEventListener("click", (e) => {
  if (e.target === bookDialog) {
    bookDialog.close();
  }
})

// Handle form submission
bookForm.addEventListener("submit", (e) => {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title, author, pages, read);
  displayLibrary();
});

// Event delegation for delete and toggle read status buttons
books.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.closest(".book-card").dataset.index;
    deleteBook(index);
  } else if (e.target.classList.contains("toggle-read-btn")) {
    const index = e.target.closest(".book-card").dataset.index;
    toggleReadStatus(index);
  }
});

// Event listeners for hover effects on toggle read status buttons
books.addEventListener("mouseover", handleToggleReadBtnHover);
books.addEventListener("mouseout", handleToggleReadBtnHover);

function handleToggleReadBtnHover(event) {
  if (event.target.classList.contains("toggle-read-btn")) {
    const index = event.target.closest(".book-card").dataset.index;
    const book = myLibrary[index];
    const button = event.target;
    const isHovering = event.type === "mouseover";
    if (isHovering) {
      // On hover, change text and color
      button.style.backgroundColor = book.read ? TOGGLE_UNREAD_HOVER_COLOR : TOGGLE_READ_HOVER_COLOR;
      button.textContent = book.read ? "Mark as unread" : "Mark as read";
    } else {
      // On mouseout, revert to the original text and color
      button.style.backgroundColor = book.read ? TOGGLE_READ_BACKGROUND_COLOR : TOGGLE_UNREAD_BACKGROUND_COLOR;
      button.textContent = book.read ? "Read" : "Not Read";
    }
  }
}

// Initial display of the library
displayLibrary();