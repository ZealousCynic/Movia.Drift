import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BusStopDto, BusStopProfileDto, UpdateBusStopProfileDto, BusStopPageWithPaginationDto } from 'domain/entity/busstop';
import { PaginationDto } from '../index';

@Injectable({
  providedIn: 'root',
})
export class BusstopRepositoryService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };

  constructor(private http: HttpClient) {}

  getBusStops(): Observable<Array<BusStopDto>> {
    return this.http.get<Array<BusStopDto>>(environment.apiUrlV1 + 'busstops');
  }

  getBusStopWithHeader(paginationDto: PaginationDto): Observable<BusStopPageWithPaginationDto> {
    let params = new HttpParams()
      .set('PageNumber', paginationDto.CurrentPage.toString())
      .set('PageSize', paginationDto.PageSize.toString());

    return this.http
      .get<any>(environment.apiUrlV1 + 'busstops', { params: params, observe: 'response' })
      .pipe(
        map(res => {
          return {
            busStopDto: res.body,
            pagination: JSON.parse(res.headers.get('x-pagination')),
          } as BusStopPageWithPaginationDto;
        })
      );
  }

  getBusStopOnID(busStopID : number) : Observable<BusStopProfileDto> {
    return this.http.get<BusStopProfileDto>(
      environment.apiUrlV1 + `busstops/${busStopID}`
    );
  }

  deleteBusStop(busStopID: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrlV1 + `busstops/${busStopID}`);
  }

  updateBusStop(
    animalProfileID: number,
    updateBusStop: UpdateBusStopProfileDto
  ): Observable<BusStopProfileDto> {
    return this.http.put<BusStopProfileDto>(
      environment.apiUrlV1 + `busstops/${animalProfileID}`,
      updateBusStop
    );
  }

  createBusStop(busStop:UpdateBusStopProfileDto): Observable<BusStopProfileDto> {
    return this.http.post<BusStopProfileDto>(
      environment.apiUrlV1 + `busstops`,
      busStop
    );
  }
}
