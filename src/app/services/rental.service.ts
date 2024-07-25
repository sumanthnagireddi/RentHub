import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HOMES_DATA } from '../shared/const';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  favorites$ = new BehaviorSubject<any[]>([])
  posted_homes$ = new BehaviorSubject<any[]>(HOMES_DATA)
  ratings$ = new BehaviorSubject<any[]>([])
  constructor() {
    this.loadFavorites();
    this.loadPostedHomes();
    this.loadRatings()
  }
  //favorites
  private loadFavorites() {
    const storedData = localStorage.getItem('favorites');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.favorites$.next(parsedData)
    }
  }
  getFavorites() {
    return this.favorites$.asObservable()
  }
  setFavorites(data: any[]) {
    localStorage.setItem('favorites', JSON.stringify(data));
    this.favorites$.next(data);
  }
  addToFavorite(data: any) {
    const existingFavorites = this.favorites$.getValue();
    const index = existingFavorites.findIndex(item => item === data);
    let newData: any;
    if (index !== -1) {
      newData = existingFavorites.filter(item => item !== data)
    } else {
      newData = [...existingFavorites, data]
    }
    this.setFavorites(newData)
  }
  //posted homes
  loadPostedHomes() {
    const storedData = localStorage.getItem('postedHomes');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.posted_homes$.next([...HOMES_DATA, ...parsedData])
    }
  }
  getHomes() {
    return this.posted_homes$.asObservable()
  }
  setPostedHome(data: any) {
    localStorage.setItem('postedHomes', JSON.stringify(data));
    this.posted_homes$.next([...HOMES_DATA, ...data]);
  }
  addToPostedHome(data: any) {
    const existingHomes = this.posted_homes$.getValue();
    console.log(existingHomes);
    let existingPostedHomes: any
    existingPostedHomes = existingHomes.filter(data => data.author == 'me');
    let newData = [...existingPostedHomes, data]
    this.setPostedHome(newData)
  }
  getHomeByID(id: any) {
    let filtered_item: any;
    this.getHomes().subscribe(data => {
      filtered_item = data.filter(
        (data: any) => data.id == id
      );
    })
    return filtered_item;
  }
  //ratings
  loadRatings() {
    const storedRatings = localStorage.getItem('ratings');
    if (storedRatings) {
      const parsedData = JSON.parse(storedRatings);
      this.ratings$.next(parsedData)
    }
  }
  getRatings() {
    return this.ratings$.asObservable()
  }
  setRatings(data: any) {
    localStorage.setItem('ratings', JSON.stringify(data));
    this.ratings$.next(data)
  }
  addToRating(data: any) {
    const existingratings = this.ratings$.getValue();
    const newData = [...existingratings, data]
    this.setRatings(newData)
    this.ratings$.next(newData)
  }
  updateRatingsData(id: any, payload: any) {
    console.log(id, payload);
    const current_home = this.getHomeByID(id)[0];
    current_home.ratings.push(payload);
    this.getHomes().subscribe(data => {
      data.forEach(item => {
        if (item.id == id) {
          item.ratings.push(payload)
        }
      })
      console.log(data);

    })

  }

}
