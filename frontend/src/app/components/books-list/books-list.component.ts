import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { map, Observable } from 'rxjs';
import { Page, PageRequest } from '../../models/page';
import { Book } from '../../models/book';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../filter.components';
import { SortDirection } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  displayedColumns: string[] = ['Title', "Author", "Year"];
  searchText: string = "";
  sortCategory: string = "title";
  sortDirection: SortDirection = '';
  sortDirectionSymbols: Map<string, string> = new Map<string, string>([
    ["title", "-"],
    ["author", "-"],
    ["year", "-"]
  ]);
  
  
  pageRequest: PageRequest = {
    pageIndex: 0,
    pageSize: 1000,
    sort: undefined,
    direction: undefined
  }

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    console.log('Loading');
    this.updateData();
    this.setSortDirectionSymbols();
  }

  updateData(){
    this.bookService.getBooks(this.pageRequest).subscribe((response:any) =>
    {
      this.dataSource = new MatTableDataSource(response.content);
      this.dataSource.paginator = this.paginator;
    });
  }

  setSortDirectionSymbols() {
    switch(this.sortDirection){
      case '':
        this.sortDirectionSymbols.set(this.sortCategory, "-");
        break;
      case 'asc': 
        this.sortDirectionSymbols.set(this.sortCategory, "↑");  
        break;    
      case 'desc':
        this.sortDirectionSymbols.set(this.sortCategory, "↓");
        break;
    }

    this.sortDirectionSymbols.forEach((value, key) => {
      if(key !== this.sortCategory){
        this.sortDirectionSymbols.set(key, "-");
      }
    });
  }

  flipSortDirection(){
    switch(this.sortDirection){
      case '': 
        this.sortDirection = 'asc';
        break;
      case 'asc':
        this.sortDirection = 'desc';
        break;
      case 'desc':
        this.sortDirection = '';
        break;
    }
  }

  onSortButtonClick(sortCategory: string){
    this.sortCategory = sortCategory;
    this.flipSortDirection();
    this.setSortDirectionSymbols();
    this.pageRequest = {
      pageIndex: 0,
      pageSize: 20,
      sort: this.sortDirection === '' ? undefined : sortCategory,
      direction: this.sortDirection === '' ? undefined : this.sortDirection
    }
    this.updateData();
  }

  filterData($event: any): void{
    // apply filter with custom filter predicate
    this.dataSource.filter = $event.target.value.trim().toLowerCase();
  }
  
  
}
