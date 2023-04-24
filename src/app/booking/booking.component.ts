import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormArray } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, map, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;



  get guests(){
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService, private fb: FormBuilder, private bookingService: BookingService, private router:ActivatedRoute){

  }

  ngOnInit(): void {

    const roomId = this.router.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl({value: roomId, disabled:true}, { validators: [Validators.required] }),
      guestEmail: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email]}],
      guestName: ['', { validators: [Validators.required, Validators.minLength(5), CustomValidator.ValidateName, CustomValidator.ValidateSpecialChar('*')] },],
      checkInDate: [''],
      checkOutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur', validators: [Validators.required]}],
      address: this.fb.group({
        addressLine1: ['', [Validators.required,],],
        addressLine2: [''],
        city: ['', [Validators.required,],],
        state: ['', [Validators.required,],],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      // guestCount: [''],
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
    },
    { updateOn: 'blur', validators: [CustomValidator.ValidateDate]}
    );


    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // });

    // this.getBookingData();

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data));

  }

  addBooking(){
    console.log(this.bookingForm.getRawValue());
    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {
      console.log(data);
    });
  //   this.bookingForm.reset({

  //     roomId: '2',
  //     guestEmail: '',
  //     checkInDate: '',
  //     checkOutDate: '',
  //     bookingStatus: '',
  //     bookingAmount: '',
  //     bookingDate: '',
  //     mobileNumber: '',
  //     guestName: '',
  //     address: {
  //       addressLine1: '',
  //       addressLine2: '',
  //       city: '',
  //       state: '',
  //       country: '',
  //       zipCode: '',
  //     },
  //     guests: [],
  //     // guestCount: '',
  //     tnc: false,
  // });
 }

  getBookingData(){
    this.bookingForm.patchValue({
      guestEmail: '',
      checkInDate: new Date ('10-Feb-2020'),
      checkOutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      // guestCount: '',
      tnc: false,
    });

    //another way of passing data from URL parameters
    // this.router.paramMap.pipe(map((params => params.get('roomid')))).subscribe((roomid) => this.bookingForm.get('roomId')?.setValue(roomid));

  }

  addGuest(){
    return this.guests.push(this.addGuestControl());
  }

  addGuestControl(){
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    })
  }

  addPassport(){
    this.bookingForm.addControl('passport', new FormControl());
  }

  deletePassport(){
    if(this.bookingForm.get('passport')){
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number){
    this.guests.removeAt(i);
  }

}
