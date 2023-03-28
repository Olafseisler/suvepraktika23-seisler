import { Component, NgModule, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, NgModel } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
  })

export class AddBookComponent implements OnInit{

    addBookForm!: FormGroup;

    constructor(private forms: FormBuilder, 
                private bookService: BookService,
                private router: Router) {}

    ngOnInit(): void {
        this.addBookForm = this.forms.group({
            title: ['', [Validators.required, Validators.maxLength(35)]],
            author: new FormControl(''),
            genre: new FormControl(''),
            year: ['', [Validators.minLength(4),
                        Validators.max(2023)]],
            comment : new FormControl(''),
        });
    }

    onSubmit(formInfo: any): void {
        console.log("Form Submitted", formInfo.form.value);
        // Define current date
        var today = new Date();
        // Generate id in range (3000, 9999)
        let currentDateString: string = today.toISOString().slice(0,10);
        //define due date 10 days from today in format yyyy-mm-dd
        let dueDate: Date = new Date();
        dueDate.setDate(dueDate.getDate() + 10);
        let dueDateString: string = dueDate.toISOString().slice(0,10);
        this.bookService.saveBook({
            id: crypto.randomUUID(),
            title: formInfo.form.value.title,
            author: formInfo.form.value.author,
            genre: formInfo.form.value.genre,
            year: formInfo.form.value.year,
            added: currentDateString,
            checkOutCount: 0,
            status: 'AVAILABLE',
            dueDate: dueDateString,
            comment: formInfo.form.value.comment,
          }).subscribe(() => {});
        this.router.navigate(['/books']);
    }

    get title() { return this.addBookForm.get('title'); }
    get year() { return this.addBookForm.get('year'); }
    get author() { return this.addBookForm.get('author'); }
    get genre() { return this.addBookForm.get('genre'); }
    get comment() { return this.addBookForm.get('comment'); }
}