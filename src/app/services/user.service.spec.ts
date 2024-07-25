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
  })
  it('should register user', () => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalstorage.getItem)
    service.registerUser('email', 'userName', 'password')
  })
});
