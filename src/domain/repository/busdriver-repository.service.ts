import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationDto } from '../entity/animal';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap } from 'rxjs/operators';
import { BusDriverDto,RerturnBusDriverDtoWithHeader,UpdateBusDriver } from '../entity/busdriver';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusdriverRepositoryService {

  constructor(private http: HttpClient) { }


  getBusDrivers(): Observable<Array<BusDriverDto>> {
    return this.http.get<Array<BusDriverDto>>(
      environment.apiUrlV1 + 'busdrivers'
    );
  }

  getBusDriversWithHeader(
    paginationDto: PaginationDto
  ): Observable<RerturnBusDriverDtoWithHeader> {
    let params = new HttpParams()
      .set('PageNumber', paginationDto.CurrentPage.toString())
      .set('PageSize', paginationDto.PageSize.toString());

    return this.http
      .get<any>(environment.apiUrlV1 + 'busdrivers', { params: params, observe: 'response' })
      .pipe(
        map(res => {
          return {
            busDriverDtos: res.body,
            pagination: JSON.parse(res.headers.get('x-pagination')),
          } as RerturnBusDriverDtoWithHeader;
        })
      );
  }

  getBusDriverByID(busDriverID: number): Observable<BusDriverDto> {
    return this.http.get<BusDriverDto>(
      environment.apiUrlV1 + `busdrivers/${busDriverID}`
    );
  }

  updateBusDriver(
    busDriverID: number,
    updateBusDriverDto: UpdateBusDriver
  ): Observable<BusDriverDto> {
    return this.http.put<BusDriverDto>(
      environment.apiUrlV1 + `busdrivers/${busDriverID}`,
      updateBusDriverDto
    );
  }

  deleteBusDriver(busDriverID: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrlV1 + `busdrivers/${busDriverID}`);
  }

  createBusDriver(
    updateBusDriverDto: UpdateBusDriver
  ): Observable<BusDriverDto> {
    return this.http.post<BusDriverDto>(
      environment.apiUrlV1 + `busdrivers`,
      updateBusDriverDto
    );
  }
}
