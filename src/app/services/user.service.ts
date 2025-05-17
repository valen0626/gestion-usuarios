import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number,
  nombre: string,
  email: string,
  rol: string,
  estado: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient){}

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>('assets/users.json')
  }
}
