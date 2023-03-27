import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Page, PageRequest } from '../../models/page';
import { Book } from '../../models/book';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { Checkout } from 'src/app/models/checkout';


@Component({
    selector: 'app-all-checkouts',
    templateUrl: './all-checkouts.component.html',
    styleUrls: ['./all-checkouts.component.scss'] 
})
export class AllCheckoutsComponent implements OnInit {
  
    checkouts$!: Observable<Page<Checkout>>;
    displayedColumns: string[] = ['Title', "Checked out", "Due", "Returned"];
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(
      private checkoutService: CheckoutService, 
    ) {
      this.sort = new MatSort();
    }
  
    ngOnInit(): void {
      // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
      this.checkouts$ = this.checkoutService.getCheckouts({});
    }
  
}  