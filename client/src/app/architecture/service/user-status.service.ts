import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStatus } from '../model/user-status';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  private URL = "http://localhost:3000/api/v1/user-status";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<UserStatus[]>(this.URL).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error)
        }
      )
    })
  }

  public getById(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<UserStatus>(this.URL + '/by-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public getByName(name: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<UserStatus>(this.URL + '/by-name/' + name).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public getByLabel(label: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-label/' + label).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public create(userStatus: UserStatus): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<UserStatus>(this.URL, userStatus).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, userStatus: UserStatus): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<UserStatus>(this.URL + '/by-id/' + id, userStatus).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.delete<UserStatus>(this.URL + '/by-id/' + id).subscribe(
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
