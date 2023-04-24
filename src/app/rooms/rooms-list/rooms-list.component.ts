import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rooms: RoomList[] = [];
  @Input() title: string = '';
  @Input() price = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }

  }

  selectRoom(room: RoomList){
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {

    console.log('on destroy is called');
  }

}
