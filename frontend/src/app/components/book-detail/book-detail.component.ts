import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { BookCheckoutComponent } from '../book-checkout-dialog/book-checkout.component';

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

  openDialog(){
    this.dialog.open(BookCheckoutComponent, {
      data: {
        book$: this.book$
      }
    });
  }

  public closeDialog(): void{
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
  }

}
