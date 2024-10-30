import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectResource } from '../model/project-resource';

@Injectable({
  providedIn: 'root'
})
export class ProjectResourceService {
  private URL = "http://localhost:8080/api/v1/project-resource";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<ProjectResource[]>(this.URL).subscribe(
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
      this.httpClient.get<ProjectResource>(this.URL + '/by-id/' + id).subscribe(
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
      this.httpClient.get<ProjectResource>(this.URL + '/by-name/' + name).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public create(projectResource: ProjectResource): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<ProjectResource>(this.URL, projectResource).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, projectResource: ProjectResource): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<ProjectResource>(this.URL + '/by-id/' + id, projectResource).subscribe(
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
      this.httpClient.delete<ProjectResource>(this.URL + '/by-id/' + id).subscribe(
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
