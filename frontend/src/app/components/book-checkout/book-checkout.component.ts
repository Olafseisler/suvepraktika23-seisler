import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-books-checkout',
    templateUrl: './book-checkout.component.html',
    styleUrls: ['./book-checkout.component.scss']
  })

export class BookCheckoutComponent implements OnInit {
    
    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
      ) {
      }

    ngOnInit(): void {

    }
}