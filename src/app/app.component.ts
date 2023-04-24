import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h1>Hello World from inline template!</h1>
  // <p>Angular is awesome!</p>
  // `,
  styleUrls: ['./app.component.scss'],
  // styles: ['h1 { color: red;}']
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = 'Users';

  @ViewChild('name', {static: true}) name!: ElementRef;

  constructor(@Optional() private loggerService : LoggerService,
              @Inject(LocalStorageToken) private localStorage: Storage,
              private initService: InitService,
              private configService: ConfigService,
              private router:Router){
     console.log(initService.config);
  }

  ngOnInit(): void {

    // this.router.events.subscribe((event) => {
    //   console.log('Event Log: ', event);
    // });

    this.router.events.pipe(
      filter(
        (event) => event instanceof NavigationStart)
      ).subscribe(
        (event) => {
          console.log('Navigation started');
        }
      );

      this.router.events.pipe(
        filter(
          (event) => event instanceof NavigationEnd)
        ).subscribe(
          (event) => {
            console.log('Navigation completed');
          }
        );

    this.loggerService?.log('LoggerService called in ngOnInit');
    // this.name.nativeElement.innerText = "Hilton Hotel";
    this.localStorage.setItem('name', 'Hilton Hotel');
  }

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //     const componentRef = this.vcr.createComponent(RoomsComponent);
  //     componentRef.instance.numberOfRooms = 50;
  // }
}
