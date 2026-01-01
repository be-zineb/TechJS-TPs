import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <h2>{{ isEdit ? 'Edit' : 'Create' }} Book</h2>
    <form [formGroup]="bookForm" (ngSubmit)="submit()">
      <label>Title:</label>
      <input formControlName="title" />
      <label>Author:</label>
      <input formControlName="author" />
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  `
})
export class BookFormComponent implements OnInit {
  bookForm = this.fb.group({ title: ['', Validators.required], author: ['', Validators.required] });
  isEdit = false;
  bookId?: number;

  constructor(private fb: FormBuilder, private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.bookId = +params['id'];
        this.bookService.getBook(this.bookId).subscribe(book => this.bookForm.patchValue(book));
      }
    });
  }

  submit() {
    if (this.bookForm.invalid) return;
    const formValue = this.bookForm.value;
    const book: Book = { id: this.bookId, title: formValue.title || '', author: formValue.author || '' };
    if (this.isEdit) this.bookService.updateBook(book).subscribe(() => this.router.navigate(['/']));
    else this.bookService.createBook(book).subscribe(() => this.router.navigate(['/']));
  }
}
