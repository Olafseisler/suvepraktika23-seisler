import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page, PageRequest } from '../../models/page';
import { Book } from '../../models/book';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.components';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  displayedColumns: string[] = ['Title', "Author", "Year"];
  searchText: string = "";

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private bookService: BookService,
  ) {
    this.sort = new MatSort();
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks({});
  }

  onSearchTextEntered(searchValue: any): void{
    console.log(searchValue);
    this.searchText = searchValue;
  }

}
