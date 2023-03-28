import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Page, PageRequest, SortDirection } from '../../models/page';
import { Book } from '../../models/book';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Checkout } from 'src/app/models/checkout';
import { MatTableDataSource } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-all-checkouts',
    templateUrl: './all-checkouts.component.html',
    styleUrls: ['./all-checkouts.component.scss'] 
})
export class AllCheckoutsComponent implements OnInit {
  
    checkouts$!: Observable<Page<Checkout>>;
    displayedColumns: string[] = ["Book", "Checked out", "Due", "Returned", "LateIcon"];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    searchText: string = "";
    sortCategory: string = "book";
    sortDirection: SortDirection = '';
    sortDirectionSymbols: Map<string, string> = new Map<string, string>([
      ["borrowedBook.title", "-"],
      ["checkedOutDate", "-"],
      ["dueDate", "-"],
      ["returnedDate", "-"]
    ]);
    pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 2000,
      sort: undefined,
      direction: undefined
    }
  
    constructor(
      private checkoutService: CheckoutService, 
    ) {
    }
  
    ngOnInit(): void {
      console.log('Loading');
      this.updateData();
      this.setSortDirectionSymbols();
    }

    updateData(){
      this.checkoutService.getCheckouts(this.pageRequest).subscribe((response:any) =>
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
  
    constructPageRequest(): void{
      this.pageRequest = {
        pageIndex: 0,
        pageSize: 20,
        sort: this.sortDirection === '' ? undefined : this.sortCategory,
        direction: this.sortDirection === '' ? undefined : this.sortDirection
      }
      console.log("Page request: " + JSON.stringify(this.pageRequest));
    }
  
    onSortButtonClick(sortCategory: string){
      this.sortCategory = sortCategory;
      this.flipSortDirection();
      this.setSortDirectionSymbols();
      this.constructPageRequest();
      this.updateData();
    }



    filterData($event: any): void{
      // apply filter with custom filter predicate
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.borrowedBook.title.toLowerCase().includes(filter)
      };
      
      this.dataSource.filter = $event.target.value.trim().toLowerCase();
    }

    earlierThanToday(dateString: string): boolean{
      return new Date(dateString) < new Date();
    }
}  