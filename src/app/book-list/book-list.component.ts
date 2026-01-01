import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService, Book } from '../book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Books</h2>
    <a routerLink="/create">Add Book</a>
    <ul>
      <li *ngFor="let book of books">
        {{book.title}} - {{book.author}}
        <a [routerLink]="['/edit', book.id]">Edit</a>
        <button (click)="deleteBook(book.id!)">Delete</button>
      </li>
    </ul>
  `
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: BookService) {}
  ngOnInit() { this.loadBooks(); }
  loadBooks() { this.bookService.getBooks().subscribe(b => this.books = b); }
  deleteBook(id: number) { this.bookService.deleteBook(id).subscribe(() => this.loadBooks()); }
}
