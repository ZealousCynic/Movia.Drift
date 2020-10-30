import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto, ReturnTokenDto } from '../entity/integrations'
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntegrationRepositoryService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  
  private integrationsCustomerToken  = 'http://localhost:5000/api/v1/integrations/customer/token'; 
  
  constructor(private http: HttpClient) { }

  getToken(login: LoginDto): Observable<ReturnTokenDto> {
    return this.http.post<ReturnTokenDto>(environment.apiUrlV1 + 'integrations/customer/token', login)
  }


}
