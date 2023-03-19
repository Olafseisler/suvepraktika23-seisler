import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { BookStatus } from 'src/app/models/book-status';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-books-checkout',
    templateUrl: './book-checkout.component.html',
    styleUrls: ['./book-checkout.component.scss']
  })

export class BookCheckoutComponent implements OnInit {
  book$: Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private dialogRef: MatDialogRef<BookCheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.book$ = data.book$;
  }

  ngOnInit(): void {  }

  calculateDate(){  }

  confirmCheckout(bookRef: Book): void {
    console.log('Confirming Checkout');
  
    if (bookRef.status == 'BORROWED'){
      console.log('Book already borrowed!');
      return;
    }

    this.bookService.saveBook({
      id: bookRef.id,
      title: bookRef.title,
      author: bookRef.author,
      genre: bookRef.genre,
      year: bookRef.year,
      added: bookRef.added,
      checkOutCount: bookRef.checkOutCount + 1,
      status: 'BORROWED',
      dueDate: bookRef.dueDate,
      comment: bookRef.comment,
    });
    console.log('Checkout Completed');

  }

  closeDialog(): void{
    console.log("Pressed close on dialog");
    this.dialogRef.close();
  }
   
}