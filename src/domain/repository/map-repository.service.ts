import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Passengers, RunningBus } from 'domain/entity/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapRepositoryService {

  constructor(private http: HttpClient) { }
  
  getRunningBusses(): Observable<Array<RunningBus>> {
    return this.http.get<Array<RunningBus>>(
      environment.apiUrlV1 + 'runningbusses'
    );
  }

  getRunningBusPassengers(registrationNumber):Observable<Passengers>{
    return this.http.get<Passengers>(
      environment.apiUrlV1 + `runningbusses/${registrationNumber}/currentpassenger`
    );
  }
    
}