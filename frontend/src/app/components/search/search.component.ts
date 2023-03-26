import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{
    @Output()
    searchTextValueChanged: EventEmitter<string>;
    searchTextValue: string = '';

    constructor() {
        this.searchTextValueChanged = new EventEmitter<string>();
    }
    
    ngOnInit(): void {
        
    }

    onSearchTextChanged(): void {
        // console.log(this.searchTextValue);
        this.searchTextValueChanged.emit(this.searchTextValue);
    }
}