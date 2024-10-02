import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../dto/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = "http://localhost:8080/api/v1/auth";

  constructor(private httpClient: HttpClient) { }

  public register(register: Register): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<any>(this.URL + '/register', register).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error)
        }
      )
    })
  }

  public login(login: any): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<any>(this.URL + '/login', login).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error)
        }
      )
    })
  }

  public verify(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/verify').subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error)
        }
      )
    })
  };

}
