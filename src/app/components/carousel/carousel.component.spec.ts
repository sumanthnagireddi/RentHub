import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent1 } from './carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CarouselComponent', () => {
  let component: CarouselComponent1;
  let fixture: ComponentFixture<CarouselComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent1,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
