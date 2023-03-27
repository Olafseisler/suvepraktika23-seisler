import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Checkout } from 'src/app/models/checkout';
import { ProblemPopup } from '../problem-popup/problem-popup.component';
import { CheckoutService } from 'src/app/services/checkout.service';
import { BookService } from 'src/app/services/book.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss']
})

export class CheckoutDetailComponent implements OnInit {
    checkout$!: Observable<Checkout>;
    
    constructor(
        private route: ActivatedRoute,
        private checkoutService: CheckoutService,
        private bookService: BookService,
        public dialog: MatDialog,
    ) {
    }
    
    ngOnInit(): void {
        this.checkout$ = this.route.params
        .pipe(map(params => params['id']))
        .pipe(switchMap(id => this.checkoutService.getCheckout(id))
        );
    }

    openProblemDialog(problemMessage: string){
        this.dialog.open(ProblemPopup, {
            data: {
                problemMessage: problemMessage,
            }
        });
    }
    
    returnBook(checkoutRef: Checkout): void {
        console.log("Returning Book");
        if (checkoutRef.returnedDate != null) {
            this.openProblemDialog('Book has already been returned!');
            return;
        }

        // Get current date in format yyyy-mm-dd
        let currentDate: string = new Date().toISOString().slice(0,10);
        
        this.checkoutService.saveCheckout({
            id: checkoutRef.id,
            borrowedBook: checkoutRef.borrowedBook,
            checkedOutDate: checkoutRef.checkedOutDate,
            dueDate: checkoutRef.dueDate,
            returnedDate: currentDate,
            borrowerFirstName: checkoutRef.borrowerFirstName,
            borrowerLastName: checkoutRef.borrowerLastName,
        }).subscribe(() => {});
        // TODO: update the book object's status to AVAILABLE
        this.bookService.saveBook({
            id: checkoutRef.borrowedBook.id,
            title: checkoutRef.borrowedBook.title,
            author: checkoutRef.borrowedBook.author,
            genre: checkoutRef.borrowedBook.genre,
            year: checkoutRef.borrowedBook.year,
            added: checkoutRef.borrowedBook.added,
            checkOutCount: checkoutRef.borrowedBook.checkOutCount,
            status: 'AVAILABLE',
            dueDate: "",
            comment: checkoutRef.borrowedBook.comment,
        }).subscribe(() => {});

        console.log("Return Completed");
    }
}