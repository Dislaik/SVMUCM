import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuotationStatus } from '../model/quotation-status';

@Injectable({
  providedIn: 'root'
})
export class QuotationStatusService {
  private URL = "http://localhost:3000/api/v1/quotation-status";

  constructor(private httpClient: HttpClient) { }

  public getAll(): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.get<QuotationStatus[]>(this.URL).subscribe(
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
      this.httpClient.get<QuotationStatus>(this.URL + '/by-id/' + id).subscribe(
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
      this.httpClient.get<QuotationStatus>(this.URL + '/by-name/' + name).subscribe(
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

  public create(quotationStatus: QuotationStatus): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<QuotationStatus>(this.URL, quotationStatus).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public update(id: number, quotationStatus: QuotationStatus): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.put<QuotationStatus>(this.URL + '/by-id/' + id, quotationStatus).subscribe(
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
      this.httpClient.delete<QuotationStatus>(this.URL + '/by-id/' + id).subscribe(
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
