const API_URL = "http://localhost:5000/books";

const bookForm = document.getElementById('bookForm');
const bookListDiv = document.getElementById('bookList');
const statsDiv = document.getElementById('stats');

bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newBook = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    pages: parseInt(document.getElementById('pages').value),
    pagesRead: parseInt(document.getElementById('pagesRead').value),
    price: parseFloat(document.getElementById('price').value),
    status: document.getElementById('status').value,
    format: document.getElementById('format').value,
    suggestedBy: document.getElementById('suggestedBy').value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook)
  });

  bookForm.reset();
  loadBooks();
});

async function loadBooks() {
  const res = await fetch(API_URL);
  const books = await res.json();

  bookListDiv.innerHTML = '';
  let totalPages = 0;
  let totalRead = 0;

  books.forEach(book => {
    const percent = ((book.pagesRead / book.pages) * 100).toFixed(1);
    totalPages += book.pages;
    totalRead += book.pagesRead;

    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md p-4 relative border border-gray-200';
    card.innerHTML = `
      <h2 class="text-xl font-bold text-blue-700">${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Status:</strong> ${book.status}</p>
      <p><strong>Format:</strong> ${book.format}</p>
      <p><strong>Pages:</strong> ${book.pagesRead}/${book.pages} (${percent}%)</p>
      <p><strong>Price:</strong> ${book.price} MAD</p>
      <p><strong>Suggested by:</strong> ${book.suggestedBy}</p>
      <p><strong>Finished:</strong> ${book.finished ? 'good' : 'no'}</p>
      <button onclick="deleteBook('${book._id}')" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">X</button>
    `;
    bookListDiv.appendChild(card);
  });

  const globalPercent = ((totalRead / totalPages) * 100).toFixed(1);
  statsDiv.textContent = `Total pages read: ${totalRead}/${totalPages} (${globalPercent}%)`;
}

async function deleteBook(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadBooks();
}

loadBooks();
