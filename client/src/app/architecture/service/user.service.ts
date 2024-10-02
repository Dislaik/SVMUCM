import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = "http://localhost:8080/api/v1/user";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<User[]> {
    return new Promise((resolve) => {
      this.httpClient.get<User[]>(this.URL).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error)
        }
      )
    })
  }

  public getById(id: number): Promise<User> {
    return new Promise((resolve) => {
      this.httpClient.get<User>(this.URL + '/by-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public getByUsername(username: string): Promise<User> {
    return new Promise((resolve) => {
      this.httpClient.get<User>(this.URL + '/by-username/' + username).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public create(user: User): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<User>(this.URL, user).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, user: User): Promise<User> {
    return new Promise((resolve) => {
      this.httpClient.put<User>(this.URL + '/by-id/' + id, user).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public delete(id: number): Promise<User> {
    return new Promise((resolve) => {
      this.httpClient.delete<User>(this.URL + '/by-id/' + id).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }
}
