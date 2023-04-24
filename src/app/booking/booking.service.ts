import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  //'any' is not recommended, an interface should always be created
  bookRoom(booking: any){

    return this.http.post('https://jsonplaceholder.typicode.com/posts', booking);

  }
}
