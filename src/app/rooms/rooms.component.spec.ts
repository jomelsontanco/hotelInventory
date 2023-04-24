import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { RoomsService } from '../services/rooms.service';
import { ConfigService } from '../services/config.service';
import { APP_CONFIG, APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule }from '@angular/common/http/testing';
import { RouteConfigToken } from '../services/routeConfig.service';
import { RoomsRoutingModule } from './rooms-routing.module';
import { ActivatedRoute } from '@angular/router';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RoomsRoutingModule ],
      declarations: [ RoomsComponent ],
      providers: [ RoomsService,
                   ConfigService,
                   ActivatedRoute,
                  {
                    provide: APP_SERVICE_CONFIG,
                    useValue: APP_CONFIG,
                  },
                  {
                    provide: RouteConfigToken,
                    useValue: { title: 'Home' },
                  }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
