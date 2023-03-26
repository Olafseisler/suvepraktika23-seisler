import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PageRequest } from '../models/page';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCheckouts(filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Book>>(url, {params});
  }

  getCheckout(bookId: string): Observable<Book> {
    const url = this.baseUrl + '/getCheckout';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Book>(url, {params});
  }

  saveCheckout(book: Book): Observable<void> {
    const url = this.baseUrl + '/saveCheckout';
    return this.http.post<void>(url, book);
  }

  deleteCheckout(bookId: string): Observable<void> {
    const url = this.baseUrl + '/deleteCheckout';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.delete<void>(url, {params});
  }

}
