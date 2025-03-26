import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestCourse } from '../model/request-course';

@Injectable({
  providedIn: 'root'
})
export class RequestCourseService {
  private URL = "http://localhost:3000/api/v1/request-course";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<RequestCourse[]>(this.URL).subscribe(
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
      this.httpClient.get<RequestCourse>(this.URL + '/by-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public create(user: RequestCourse): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<RequestCourse>(this.URL, user).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, requestCourse: RequestCourse): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<RequestCourse>(this.URL + '/by-id/' + id, requestCourse).subscribe(
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
      this.httpClient.delete<RequestCourse>(this.URL + '/by-id/' + id).subscribe(
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
