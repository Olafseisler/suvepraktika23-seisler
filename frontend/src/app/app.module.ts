import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './components/filter.components';
import { AllCheckoutsComponent } from './components/all-checkouts/all-checkouts.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ProblemPopup } from './components/problem-popup/problem-popup.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    BookDialogComponent,
    AllCheckoutsComponent,
    AddBookComponent,
    CheckoutDetailComponent,
    FilterPipe,
  ],
  entryComponents: [
    BookDialogComponent,
    ProblemPopup,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
