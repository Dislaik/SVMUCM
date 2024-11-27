import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuotationAPUResource } from '../model/quotation-apu-resource';

@Injectable({
  providedIn: 'root'
})
export class QuotationAPUResourceService {
  private URL = "http://localhost:8080/api/v1/quotation-apu-resource";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<QuotationAPUResource[]>(this.URL).subscribe(
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
      this.httpClient.get<QuotationAPUResource>(this.URL + '/by-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public getByQuotationId(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-quotation-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public getByAPUId(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-apu-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public getByResourceId(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<any>(this.URL + '/by-resource-id/' + id).subscribe(
        data => {
          resolve(data);
        },
        error => {
          resolve(error);
        }
      );
    })
  };

  public create(p1: QuotationAPUResource): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<QuotationAPUResource>(this.URL, p1).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, p1: QuotationAPUResource): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<QuotationAPUResource>(this.URL + '/by-id/' + id, p1).subscribe(
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
      this.httpClient.delete<QuotationAPUResource>(this.URL + '/by-id/' + id).subscribe(
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
