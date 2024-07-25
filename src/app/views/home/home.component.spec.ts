import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RentalService } from '../../services/rental.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockService : RentalService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: RentalService, useValue: mockService
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    mockService = TestBed.inject(RentalService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the listings from rental service', () => {
    const response = [
      {
        "id": "ef4803d0-3f93-4ba4-b55a-5b74669d1e69",
        "unitInformation": {
          "title": "Luxury Apartment in Downtown",
          "description": "Spacious apartment with modern amenties. Enjoy breathtaking views of the city skyline from this luxurious residence.",
          "unit_type": "Apartment",
          "unit_name": "Skyview Residences",
          "shared_property": "Private",
          "unit_area": "1200 sqft",
          "unit_number": "A-101",
          "unit_address": "123 Main Street",
          "unit_images": ["assets/apartmen4.jpg", "assets/interior1.avif", "assets/interior2.avif", "assets/interior3.avif"]
        },
        "rentInformation": {
          "expected_rent": "2500 USD",
          "rent_negotiable": true,
          "stay_type": "Long-term",
          "minimum_rent_time": "12 months",
          "late_charges": 50,
          "minimum_down_payment": 500
        },
        "facilities": {
          "furnished": "Fully furnished",
          "amenties": ["Pool, Gym, Parking"]
        },
        "ratings": [
          {
            userName: "John Doe",
            review: "This is very good and owner is friendly.",
            reviewedOn: "Mon Jul 22 2024 09:29:08 GMT+0530"
          },
          {
            userName: "Jane Smith",
            review: "Absolutely loved living here! The amenties are top-notch.",
            reviewedOn: "Tue Jul 23 2024 14:15:30 GMT+0530"
          }
        ]
      }
    ]
  })
});
