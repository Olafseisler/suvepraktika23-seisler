import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { AllCheckoutsComponent } from './components/all-checkouts/all-checkouts.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'checkouts/:id', component: CheckoutDetailComponent},
  {path: 'checkouts', component: AllCheckoutsComponent},
  {path: 'add-book', component: AddBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


