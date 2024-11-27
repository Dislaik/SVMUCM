import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectVolunteerStudent } from '../model/project-volunteer-student';

@Injectable({
  providedIn: 'root'
})
export class ProjectVolunteerStudentService {
  private URL = "http://localhost:8080/api/v1/project-volunteer-student";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<ProjectVolunteerStudent[]>(this.URL).subscribe(
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
      this.httpClient.get<ProjectVolunteerStudent>(this.URL + '/by-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public getByProjectId(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-project-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public getByVolunteerStudentId(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-volunteer-student-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public create(projectVolunteerStudent: ProjectVolunteerStudent): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<ProjectVolunteerStudent>(this.URL, projectVolunteerStudent).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, projectVolunteerStudent: ProjectVolunteerStudent): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<ProjectVolunteerStudent>(this.URL + '/by-id/' + id, projectVolunteerStudent).subscribe(
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
      this.httpClient.delete<ProjectVolunteerStudent>(this.URL + '/by-id/' + id).subscribe(
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
