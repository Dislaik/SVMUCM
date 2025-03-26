import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectStatus } from '../model/project-status';

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {
  private URL = "http://localhost:3000/api/v1/project-status";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<ProjectStatus[]>(this.URL).subscribe(
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
      this.httpClient.get<ProjectStatus>(this.URL + '/by-id/' + id).subscribe(
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
      this.httpClient.get<ProjectStatus>(this.URL + '/by-name/' + name).subscribe(
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

  public create(projectStatus: ProjectStatus): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<ProjectStatus>(this.URL, projectStatus).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, projectStatus: ProjectStatus): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<ProjectStatus>(this.URL + '/by-id/' + id, projectStatus).subscribe(
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
      this.httpClient.delete<ProjectStatus>(this.URL + '/by-id/' + id).subscribe(
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
