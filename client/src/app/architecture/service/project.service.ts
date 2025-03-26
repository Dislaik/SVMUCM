import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private URL = "http://localhost:3000/api/v1/project";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<Project[]>(this.URL).subscribe(
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
      this.httpClient.get<Project>(this.URL + '/by-id/' + id).subscribe(
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
      this.httpClient.get<Project>(this.URL + '/by-name/' + name).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public getByUserId(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<Project[]>(this.URL + '/by-user-id/' + id).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error)
        }
      )
    })
  }

  public create(project: Project): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<Project>(this.URL, project).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, project: Project): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<Project>(this.URL + '/by-id/' + id, project).subscribe(
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
      this.httpClient.delete<Project>(this.URL + '/by-id/' + id).subscribe(
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
