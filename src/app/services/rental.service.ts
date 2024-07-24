import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HOMES_DATA } from '../shared/const';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  homes_data: any = localStorage.getItem('homes')?localStorage.getItem('homes'):null;
  favorites_data: any = localStorage.getItem('favorites');
  homes: any = new Subject<any>();
  favorites: any = new Subject<any>();
  constructor(private http: HttpClient) {}

  getAllListings() {
    const static_data: any = HOMES_DATA;
    this.homes = [...static_data];
    return this.homes;
  }

  pushToLocalStorage(data: any) {
    localStorage.setItem('homes', JSON.stringify(data));
  }
  createNewPost(payload: any) {
    const existingData: any = this.getAllListings();
    existingData.unshift(payload);
    return this.pushToLocalStorage(existingData);
  }
  getHomeByID(id: any) {
    const filtered_item: any = this.getAllListings().filter(
      (data: any) => data.id == id
    );
    return filtered_item;
  }
  updateRatingsData(id: any, payload: any) {
    const existingData = this.getAllListings();
    const item = this.getHomeByID(id);
    const homeIndex = existingData.findIndex((item: any) => item.id === id);
    console.log(homeIndex);
    const updatedData = item[0]?.ratings?.unshift(payload);
    existingData[homeIndex] = item[0];
    this.pushToLocalStorage(existingData);
  }
  getAllfavorites() {
    try {
      this.favorites = JSON.parse(this.favorites_data);
      return this.favorites;
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return [];
    }
  }

  addTofavorites(data: any) {
    try {
      if (!localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', JSON.stringify([data]));
      } else {
        const existingData: any = this.getAllfavorites();
        existingData.push(data);
        localStorage.setItem('favorites', JSON.stringify(existingData));
      }
    } catch (error) {
      console.error('Error storing JSON to localStorage:', error);
    }
  }
}
