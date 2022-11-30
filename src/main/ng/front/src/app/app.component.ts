import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bid-give';
  response: Observable<object>

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.response = this.http.get('/api/cat/all');
  }

}
