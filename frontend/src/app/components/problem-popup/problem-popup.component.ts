import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookStatus } from 'src/app/models/book-status';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';

export type ActionMode = 'checkout' | 'delete';

@Component({
    selector: 'app-problem-popup',
    templateUrl: './problem-popup.component.html',
    styleUrls: ['./problem-popup.component.scss']
  })

export class ProblemPopup implements OnInit {
    problemMessage: string = "This is a problem message";

  constructor(
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ProblemPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.problemMessage = data.problemMessage;
  }

  ngOnInit(): void {  }

  closeDialog(): void{
    console.log("Pressed close on dialog");
    this.dialogRef.close();
  }
   
}