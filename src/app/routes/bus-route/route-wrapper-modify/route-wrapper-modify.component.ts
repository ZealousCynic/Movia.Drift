import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-bus-route-route-wrapper-modify',
  templateUrl: './route-wrapper-modify.component.html',
  styleUrls: ['./route-wrapper-modify.component.scss']
})
export class BusRouteRouteWrapperModifyComponent implements OnInit {
 
  routeId : number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.routeId = params['id'];
    });    
  }

}
