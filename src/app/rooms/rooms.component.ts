import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from '../services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnChanges {

  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;

  selectedRoom!: RoomList;

  title = 'Room List';

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  rooms: Room = {

    totalRooms: 20,
    availableRooms:  10,
    bookedRooms:  5

  }

  roomList : RoomList[] = [];

  stream$ = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  totalBytes = 0;

  subscription !: Subscription;

  error$ : Subject<string> = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      //best practice is to write this code in the service not in a component like here.
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  );

  constructor(@SkipSelf() private roomsService : RoomsService, private configService: ConfigService){

  }

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent : {
          console.log('Request has been made!');
          break;
        }

        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes+= event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    this.stream$.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    });
    this.stream$.subscribe((data) => console.log(data));
    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });

  }

  ngDoCheck(): void {
      console.log('Do Check is called in rooms component');
  }

  ngAfterViewInit(): void {
    // this.headerComponent.title = "Rooms View";
  }

  ngAfterViewChecked(): void {

    // this.headerChildrenComponent.last.title="Last Title";

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('On Changes is called in rooms component');

  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList){
    // console.log(room);
    // this.selectedRoom = room;
  }

  addRoom(){

    const room: RoomList = {
      roomNumber: '4',
      roomType : 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 5000,
      photos: 'https://img.freepik.com/free-photo/sofa-living-room-with-copy-space_43614-869.jpg',
      checkInTime: new Date('11-Nov-2022'),
      checkOutTime: new Date('12-Nov-2022'),
      rating: 1.63343434,
    };

    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom(){

    const room: RoomList = {
      roomNumber: '3',
      roomType : 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://img.freepik.com/free-photo/sofa-living-room-with-copy-space_43614-869.jpg',
      checkInTime: new Date('11-Nov-2022'),
      checkOutTime: new Date('12-Nov-2022'),
      rating: 1.63343434,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }
}


