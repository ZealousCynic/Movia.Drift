import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnPlaceDto } from '../entity/place'
import { BooleanInput } from '@angular/cdk/coercion';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceRepositoryService {

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Array<ReturnPlaceDto>> {
    return this.http.get<Array<ReturnPlaceDto>>(environment.apiUrlV1 + 'places')
  }

}
