import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseMode } from '../model/course-mode';

@Injectable({
  providedIn: 'root'
})
export class CourseModeService {
  private URL = "http://localhost:3000/api/v1/course-mode";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<CourseMode[]>(this.URL).subscribe(
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
      this.httpClient.get<CourseMode>(this.URL + '/by-id/' + id).subscribe(
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
      this.httpClient.get<CourseMode>(this.URL + '/by-name/' + name).subscribe(
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

  public create(user: CourseMode): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<CourseMode>(this.URL, user).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, CourseMode: CourseMode): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<CourseMode>(this.URL + '/by-id/' + id, CourseMode).subscribe(
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
      this.httpClient.delete<CourseMode>(this.URL + '/by-id/' + id).subscribe(
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
