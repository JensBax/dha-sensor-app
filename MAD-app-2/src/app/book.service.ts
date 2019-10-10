import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private openLibraryUrl = 'https://openlibrary.org/';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET book from the server */
  getBook(ISBN: string): Observable<Book> {
    const url = `${this.openLibraryUrl}api/books?bibkeys=ISBN:${ISBN}&format=json&jscmd=data`;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError<Book>('getBook', {})),
      map(result => {
        // need to unwrap the first object of the response
        result = result[Object.keys(result)[0]];
        const book = new Book();
        Object.assign(book, result);
        return book;
      })
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
