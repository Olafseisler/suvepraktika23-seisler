import { Component, NgModule, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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

    constructor(private forms: FormBuilder) {}

    ngOnInit(): void {
        this.addBookForm = this.forms.group({
            title: ['', [Validators.required, Validators.maxLength(10)]],
            author: new FormControl(''),
            genre: new FormControl(''),
            year: ['', [Validators.minLength(4),
                        Validators.max(2023)]],
            comment : new FormControl(''),
        });
    }
    

    onSubmit(formInfo: any): void {
        console.log("Form Submitted", formInfo);
    }

    get title() { return this.addBookForm.get('title'); }
    get year() { return this.addBookForm.get('year'); }
    get author() { return this.addBookForm.get('author'); }
    get genre() { return this.addBookForm.get('genre'); }
    get comment() { return this.addBookForm.get('comment'); }
}