import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap, repeat, expand, take, takeWhile} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ReturnRouteBusDto, 
  ReturnRouteDto, 
  CreateAndUpdateRouteDto, 
  ReturnRouteBusStopDto, 
  ReturnBusStopWithOrderDto,
  ReturnRouteBusDriverlDto,
  ReturnBusAndDriverInRouteDto,
  BusWithDriverDto
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
  
  getRouteById(routeId: number): Observable<ReturnRouteDto> {
    return this.http.get<ReturnRouteDto>(
      environment.apiUrlV1 + `routes/${routeId}`
    );
  }

  createRoute(
    createRouteDto: CreateAndUpdateRouteDto
  ): Observable<ReturnRouteDto> {
    return this.http.post<ReturnRouteDto>(
      environment.apiUrlV1 + `routes`,
      createRouteDto
    );
  }

  updateRoute(
    routeId: number,
    updateRouteDto: CreateAndUpdateRouteDto
  ): Observable<ReturnRouteDto> {
    return this.http.put<ReturnRouteDto>(
      environment.apiUrlV1 + `routes/${routeId}`,
      updateRouteDto
    );
  }

  getAllBusStop(): Observable<Array<ReturnRouteBusStopDto>> {

    let pageNumber : number = 1;
    //https://www.jianshu.com/p/2adec1539ab1

    return this.http.get<Array<ReturnRouteBusStopDto>>(
        environment.apiUrlV1 + `busstops?PageNumber=${pageNumber}`
    )
    .pipe(
      expand(val => this.getRouteBusStop(pageNumber)),
      map(val => {
        pageNumber = pageNumber +1 ; 
        return val}), 
      takeWhile( val => Object.keys(val).length != 0)
    );
  }

  getRouteBusStop(pageNumber : number) : Observable<Array<ReturnRouteBusStopDto>> {
    return this.http.get<Array<ReturnRouteBusStopDto>>(
        environment.apiUrlV1 + `busstops?PageNumber=${pageNumber}`
    );
  }  

  getBusStopByRoute(routeId : number) : Observable<Array<ReturnBusStopWithOrderDto>> {
    return this.http.get<Array<ReturnBusStopWithOrderDto>>(
        environment.apiUrlV1 + `routes/${routeId}/busstops`        
    );
  }
  
  addBusStopToRoute(routeId : number, busStopId : number, order : number) : Observable<boolean> {    
    return this.http.post<boolean>(
        environment.apiUrlV1 + `routes/${routeId}/busstops/${busStopId}/${order}`,
        null
    );
  }

  removeBusStopFromRoute(routeId : number, busStopId : number) : Observable<boolean> {     
    return this.http.delete<boolean>(
        environment.apiUrlV1 + `routes/${routeId}/busstops/${busStopId}`
    );
  }
  

  getAllBusToRoute(): Observable<Array<ReturnRouteBusDto>> {

    let pageNumber : number = 1;

    return this.http.get<Array<ReturnRouteBusDto>>(
        environment.apiUrlV1 + `busses?PageNumber=${pageNumber}`
    )
    .pipe(
      expand(val => this.getBusToRoute(pageNumber)),
      map(val => {
        pageNumber = pageNumber +1 ; 
        return val}), 
      takeWhile( val => Object.keys(val).length != 0)
    );
  }

  getBusToRoute(pageNumber: number) : Observable<Array<ReturnRouteBusDto>> {
    return this.http.get<Array<ReturnRouteBusDto>>(
      environment.apiUrlV1 + `busses?PageNumber=${pageNumber}`
    );
  }

  getDriverToRoute(pageNumber: number) : Observable<Array<ReturnRouteBusDriverlDto>> {
    return this.http.get<Array<ReturnRouteBusDriverlDto>>(
      environment.apiUrlV1 + `busdrivers?PageNumber=${pageNumber}`
    );
  }  

  getAllDriverToRoute(): Observable<Array<ReturnRouteBusDriverlDto>> {

    let pageNumber : number = 1;

    return this.http.get<Array<ReturnRouteBusDriverlDto>>(
        environment.apiUrlV1 + `busdrivers?PageNumber=${pageNumber}`
    )
    .pipe(
      expand(val => this.getDriverToRoute(pageNumber)),
      map(val => {
        pageNumber = pageNumber +1 ; 
        return val}), 
      takeWhile( val => Object.keys(val).length != 0)
    );
  }  
  
  getBusAndDriverToRoute(routeId : number): Observable<Array<ReturnBusAndDriverInRouteDto>> {
    return this.http.get<Array<ReturnBusAndDriverInRouteDto>>(
      environment.apiUrlV1 + `routes/${routeId}/busses`
    );
  }
  
  addBusWithDriverToRoute( routeId: number, busWithDriverDto: BusWithDriverDto ): Observable<boolean> {
    return this.http.post<boolean>(
      environment.apiUrlV1 + `routes/${routeId}/busses`,
      busWithDriverDto
    );
  }
  
  removeBusFromRoute(routeId: number, busId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.apiUrlV1 + `routes/${routeId}/busses/${busId}`
    );
  }

}