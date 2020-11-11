import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap, repeat, expand, take, takeWhile} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ReturnBusModelDto,
  CreateAndUpdateBusModelDto
} from '../entity/busmodel';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusmodelRepositoryService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };

  constructor(private http: HttpClient) { }

  getBusModels(): Observable<Array<ReturnBusModelDto>> {
    return this.http.get<Array<ReturnBusModelDto>>(
      environment.apiUrlV1 + 'busmodels'
    );
  }

  getBusModelsById(busModelID : number) : Observable<ReturnBusModelDto> {
    return this.http.get<ReturnBusModelDto>(
      environment.apiUrlV1 + `busmodels/${busModelID}`
    );
  }

  createBusModel(
    createBusModelDto: CreateAndUpdateBusModelDto
  ): Observable<ReturnBusModelDto> {
    return this.http.post<ReturnBusModelDto>(
      environment.apiUrlV1 + `busmodels`,
      createBusModelDto
    );
  }
  
  updateBusModel(
    busModelId: number,
    updateBusModelDto: CreateAndUpdateBusModelDto
  ): Observable<ReturnBusModelDto> {
    return this.http.put<ReturnBusModelDto>(
      environment.apiUrlV1 + `busmodels/${busModelId}`,
      updateBusModelDto
    );
  }
  
  deleteBusMode(busModelId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.apiUrlV1 + `busmodels/${busModelId}`
    );
  }

}
