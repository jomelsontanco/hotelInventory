import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id!: number;

  id$ = this.router.paramMap.pipe(map(params => params.get('roomid')));

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {

    // this.router.paramMap.subscribe((params) => { params.get('roomId') });
    // this.router.params.subscribe((params) => { this.id = params['roomid'] });
  }

}
