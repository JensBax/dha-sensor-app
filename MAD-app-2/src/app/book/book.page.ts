import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  book: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute) {
    this.getBook();
  }

  getBook(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    this.bookService.getBook(isbn)
        .subscribe(result => {
          this.book = result;
          console.log(this.book); });
  }

  ngOnInit() {
  }

}
