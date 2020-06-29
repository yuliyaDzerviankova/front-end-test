import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PersonalData} from './personalData';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  data: PersonalData;

  constructor() {
  }

  getUser(): Observable<any> {
    return of(this.data);
  }

  setUser(data) {
    this.data = {...data};
    console.log(this.data);
  }
}
