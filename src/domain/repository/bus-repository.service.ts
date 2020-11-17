import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PaginationDto } from 'domain/entity/animal';
import { ReturnBusDto, ReturnBusWithPaginationDto } from 'domain/entity/bus';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusRepositoryService {

  constructor(private http: HttpClient) { }

  getBusWithHeader(
    paginationDto: PaginationDto
  ): Observable<ReturnBusWithPaginationDto> {
    let params = new HttpParams()
      .set('PageNumber', paginationDto.CurrentPage.toString())
      .set('PageSize', paginationDto.PageSize.toString());
    return this.http
      .get<any>(environment.apiUrlV1 + 'busses', { params: params, observe: 'response' })
      .pipe(
        map(res => {
          return {
            bus: res.body,
            pagination: JSON.parse(res.headers.get('x-pagination')),
          } as ReturnBusWithPaginationDto;
        })
      );
  }

  getAnimalProfilByID(busID: number): Observable<ReturnBusDto> {
    return this.http.get<ReturnBusDto>(
      environment.apiUrlV1 + `busses/${busID}`
    );
  }

}
