import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecoveryPassword } from '../dto/recovery-password';
import { RecoveryPasswordConfirm } from '../dto/recovery-password-confirm';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {
  private URL = "http://localhost:8080/api/v1/recovery-password";

  constructor(private httpClient: HttpClient) { }

  public sendPasswordRecovery(email: RecoveryPassword): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<any>(this.URL, email).subscribe(
        data => {
          resolve(data)
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  public sendPasswordRecoveryConfirm(email: RecoveryPasswordConfirm): Promise<any> {
    return new Promise((resolve) => {
      this.httpClient.post<any>(this.URL + '/confirm', email).subscribe(
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
