import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quotation } from '../model/quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private URL = "http://localhost:8080/api/v1/quotation";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<Quotation[]>(this.URL).subscribe(
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
      this.httpClient.get<Quotation>(this.URL + '/by-id/' + id).subscribe(
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
      this.httpClient.get<Quotation>(this.URL + '/by-project-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public create(quotation: Quotation): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<Quotation>(this.URL, quotation).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, quotation: Quotation): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<Quotation>(this.URL + '/by-id/' + id, quotation).subscribe(
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
      this.httpClient.delete<Quotation>(this.URL + '/by-id/' + id).subscribe(
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
