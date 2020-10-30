import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ReturnRouteDto
} from '../entity/route';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteRepositoryService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Array<ReturnRouteDto>> {
    return this.http.get<Array<ReturnRouteDto>>(
      environment.apiUrlV1 + 'routes'
    );
  }

}
