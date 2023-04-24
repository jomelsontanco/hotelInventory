import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms/rooms';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable(
  {
  providedIn: 'root'
  }
)
export class RoomsService {

  roomList: RoomList[]= [];
  // headers = new HttpHeaders({ 'token' : '1234343412341dfadfa' });

  //this has error handling code in rooms component
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  );

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient)  {

    console.log(this.config.apiEndpoint);
    console.log('Room Service Created!');
  }

  getRooms(){
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList){
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  delete(id: string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos(){
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {reportProgress: true} );
    return this.http.request(request);
  }
}
