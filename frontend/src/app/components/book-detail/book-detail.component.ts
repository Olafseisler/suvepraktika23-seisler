import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProblemPopup } from '../problem-popup/problem-popup.component';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public dialog: MatDialog,
  ) {
  }

  openConfirmDialog(bookRef: any, action: string){
    if (bookRef.status == 'BORROWED'){
      this.openProblemDialog('Book is currently borrowed and cannot be checked out or deleted!');
      return;
    }

    if (bookRef.status == 'RETURNED' && action == 'checkout'){
      this.openProblemDialog('Book has been returned but is not available for checkout!');
      return;
    }

    if (bookRef.status == 'DAMAGED' && action == 'checkout'){
      console.warn('Damaged book cannot be checked out!');
      return;
    }

    if (bookRef.status == 'PROCESSING'){
      console.warn('Unable to proceed. Book is currently being processed!');
      return;
    }

    this.dialog.open(BookDialogComponent, {
      data: {
        book$: this.book$,
        actionMode: action,
      }
    });
  }

  public closeDialog(): void{
    this.dialog.closeAll();
  }

  openProblemDialog(problemMessage: string){
    this.dialog.open(ProblemPopup, {
      data: {
      problemMessage: problemMessage, 
      }
    });
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
  }

}
