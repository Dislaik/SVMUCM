import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VolunteerStudent } from '../model/volunteer-student';

@Injectable({
  providedIn: 'root'
})
export class VolunteerStudentService {
  private URL = "http://localhost:8080/api/v1/volunteer-student";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL).subscribe(
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
      this.httpClient.get<any>(this.URL + '/by-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public getByRun(run: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-run/' + run).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public getByEmail(email: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-email/' + email).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public create(volunteerStudent: VolunteerStudent): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<VolunteerStudent>(this.URL, volunteerStudent).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, volunteerStudent: VolunteerStudent): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<any>(this.URL + '/by-id/' + id, volunteerStudent).subscribe(
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
      this.httpClient.delete<any>(this.URL + '/by-id/' + id).subscribe(
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
