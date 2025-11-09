export class Book {
  constructor(title, author, pages, status, price, pagesRead, format, suggestedBy) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.price = price;
    this.pagesRead = pagesRead;
    this.format = format;
    this.suggestedBy = suggestedBy;
    this.finished = pagesRead >= pages ? true : false;
    this.currentlyAt = this.getProgress();
  }

  getProgress() {
    return ((this.pagesRead / this.pages) * 100).toFixed(1);
  }

  updatePagesRead(pagesRead) {
    this.pagesRead = pagesRead;
    this.finished = this.pagesRead >= this.pages;
    this.currentlyAt = this.getProgress();
  }

  deleteBook(bookList) {
    const index = bookList.indexOf(this);
    if (index !== -1) bookList.splice(index, 1);
  }
}
