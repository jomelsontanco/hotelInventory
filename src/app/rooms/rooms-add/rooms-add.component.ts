import { Component } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from 'src/app/services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {

  room : RoomList = {

    roomType: '',
    amenities: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0
  }

  successMessage : string = "";

  constructor(private roomsService: RoomsService){

  }

  AddRoom(roomsForm: NgForm){
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully'});
      roomsForm.reset();
  }

}
