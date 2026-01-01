import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'create', component: BookFormComponent },
  { path: 'edit/:id', component: BookFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // <-- important ! RouterModule importé ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
