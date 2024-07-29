import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { inject } from '@angular/core';

describe('UserService', () => {
  let service: UserService;
  let mockLocalstorage: any
  beforeEach(() => {
    let mockStore: any = {};
    mockLocalstorage = {
      getItem: (key: string): string => {
        return key in mockStore ? mockStore[key] : null
      },
      setItem: (key: string, value: string) => {
        mockStore[key] = `${value}`
      },
      clear: () => {
        mockStore = {}
      }
    }
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should clear localstorage', () => {
    service.logoutUser()
    spyOn(localStorage, 'clear').and.callFake(mockLocalstorage.clear)
    expect(localStorage.length).toBe(0)
  })
  it('should register user', () => {
    service.registerUser('email', 'userName', 'password')
    spyOn(localStorage, 'getItem').and.callFake(mockLocalstorage.getItem)
  })
  it('should login user',()=>{
    service.loginUser('dummy','dummy@123');
    
  })
});
