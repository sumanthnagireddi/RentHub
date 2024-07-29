import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { ActivatedRoute, Params, provideRouter } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { routes } from '../../app.routes';
import { RentalService } from '../../services/rental.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    const paramsSubject = new BehaviorSubject<Params>({});
    await TestBed.configureTestingModule({
      imports: [DetailsComponent,],
      providers: [RentalService,{ provide: ActivatedRoute, useValue: {
        params:paramsSubject.asObservable(),
        snapshot:{data:{}}
      } }],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
