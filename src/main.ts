import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { BookListComponent } from './app/book-list/book-list.component';
import { BookFormComponent } from './app/book-form/book-form.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'create', component: BookFormComponent },
  { path: 'edit/:id', component: BookFormComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
});
