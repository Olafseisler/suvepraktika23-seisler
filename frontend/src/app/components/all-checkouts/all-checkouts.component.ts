import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page, PageRequest } from '../../models/page';
import { Book } from '../../models/book';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';


@Component({
    selector: 'app-all-checkouts',
    templateUrl: './all-checkouts.component.html',
    styleUrls: ['./all-checkouts.component.scss'] 
})
export class AllCheckoutsComponent implements OnInit {
  
    checkouts$!: Observable<Page<Book>>;
    displayedColumns: string[] = ['Title', "Author", "Year"];
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(
      private bookService: BookService, 
    ) {
      this.sort = new MatSort();
    }
  
    ngOnInit(): void {
      // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
      this.checkouts$ = this.bookService.getCheckouts({});
    }
  
}  