import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RentalService } from '../../services/rental.service';
import { of } from 'rxjs';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HOMES_DATA } from '../../shared/const';
import { provideRouter, Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingHarness } from '@angular/router/testing'
import { provideLocationMocks } from '@angular/common/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockService: any;
  let router: Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        importProvidersFrom([BrowserAnimationsModule]),
        RentalService,
        provideRouter([{ path: 'details/:id', component: DetailsComponent }]),
        provideHttpClient(),
        provideLocationMocks(),

      ],
    }).compileComponents()
    fixture = TestBed.createComponent(HomeComponent);
    mockService = TestBed.inject(RentalService);
    router = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the listings from rental service', () => {
    const response = [
      {
        id: 'ef4803d0-3f93-4ba4-b55a-5b74669d1e69',
        unitInformation: {
          title: 'Luxury Apartment in Downtown',
          description:
            'Spacious apartment with modern amenities. Enjoy breathtaking views of the city skyline from this luxurious residence.',
          unit_type: 'Apartment',
          unit_name: 'Skyview Residences',
          shared_property: 'Private',
          unit_area: '1200 sqft',
          unit_number: 'A-101',
          unit_address: '123 Main Street',
          unit_images: [
            'assets/apartmen4.jpg',
            'assets/interior1.avif',
            'assets/interior2.avif',
            'assets/interior3.avif',
          ],
        },
        rentInformation: {
          expected_rent: '2500 USD',
          rent_negotiable: true,
          stay_type: 'Long-term',
          minimum_rent_time: '12 months',
          late_charges: 50,
          minimum_down_payment: 500,
        },
        facilities: {
          furnished: 'Fully furnished',
          amenities: ['Pool, Gym, Parking'],
        },
        ratings: [
          {
            userName: 'John Doe',
            review: 'This is very good and owner is friendly.',
            reviewedOn: 'Mon Jul 22 2024 09:29:08 GMT+0530',
          },
          {
            userName: 'Jane Smith',
            review:
              'Absolutely loved living here! The amenities are top-notch.',
            reviewedOn: 'Tue Jul 23 2024 14:15:30 GMT+0530',
          },
        ],
      },
    ];
    let homesSpy = spyOn(mockService, 'getHomes').and.returnValue(of(response));
    component.ngOnInit();
    expect(homesSpy).toHaveBeenCalledTimes(1);
    expect(component.listings).toEqual(response);
  });

  it('should assign the filtered listings to listings from rental service', () => {
    expect(component.filtered_listings).toEqual(component.listings);
  });

  it('should set data to amenitie', () => {
    const homes: any = HOMES_DATA;
    const amenities = new Set();
    homes.forEach((item: any) => {
      if (
        item?.facilities?.amenities &&
        item?.facilities?.amenities.length > 0
      ) {
        item?.facilities?.amenities?.forEach((element: string) => {
          amenities.add(element);
        });
      }
    });
    component.ngOnInit();
    expect(component.amenities).toEqual(amenities);
  });
  it('shouldHandletheSelectionChange', () => {
    let filtered_listings: any = [];
    const listings: any = HOMES_DATA;
    let selectedAmeneities: any = []
    filtered_listings = listings.filter((listing: any) => {
      if (selectedAmeneities?.length === 0) {
        return true
      } else {
        if (listing.facilities && listing.facilities.amenities) {
          return selectedAmeneities.some((amenty: any) => listing.facilities.amenities.includes(amenty))
        }
      }
    })
    component.handleSelectionChange()
    expect(component.filtered_listings).toEqual([])
  })
  it('displays the name of the hero', async () => {
    let data = { id: 123 }
    component.navigateToViewDetails(data)
    expect(spyOn(router, 'navigate'))
      .withContext('should nav to detail for selected apartment')
      .toHaveBeenCalledWith(['details', data.id]);
  })
});
