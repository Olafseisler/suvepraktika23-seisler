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
import { Action } from 'rxjs/internal/scheduler/Action';

export type ActionMode = 'checkout' | 'delete';

@Component({
    selector: 'app-book-dialog',
    templateUrl: './book-dialog.component.html',
    styleUrls: ['./book-dialog.component.scss']
  })

export class BookDialogComponent implements OnInit {
  book$: Observable<Book>;
  actionMode: ActionMode = 'checkout';
  responseObject!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.book$ = data.book$;
    this.actionMode = data.actionMode;
  }

  ngOnInit(): void {  }

  calculateDate(){  }

  confirmCheckout(bookRef: Book): void {
    console.log('Confirming Checkout');
    console.log(bookRef);
    
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
    }).subscribe(() => {});
    console.log('Checkout Completed');

  }

  confirmDelete(bookRef: Book): void {
    console.log('Confirming Delete');
    console.log(bookRef);
    this.bookService.deleteBook(bookRef.id).subscribe(() => {});

    // TODO: Route back to all books page

    console.log('Delete Completed');
  }

  handleAction(bookRef: Book): void {
    if (this.actionMode == 'checkout'){
      this.confirmCheckout(bookRef);
    } else if (this.actionMode == 'delete'){
      this.confirmDelete(bookRef);
    }
    this.dialogRef.close();
  }

  closeDialog(): void{
    console.log("Pressed close on dialog");
    this.dialogRef.close();
  }
   
}