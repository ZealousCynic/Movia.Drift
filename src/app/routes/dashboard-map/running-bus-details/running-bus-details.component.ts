import { Component, Input, OnInit } from '@angular/core';
import { RunningBus } from 'domain/entity/map';

@Component({
  selector: 'app-dashboard-map-running-bus-details',
  templateUrl: './running-bus-details.component.html',
  styleUrls: ['./running-bus-details.component.scss']
})
export class DashboardMapRunningBusDetailsComponent implements OnInit {
  @Input() selectedBus : RunningBus

  constructor() { }

  ngOnInit() {
  }

  ngModelChange(){
    console.log("I have changed");
  }

}
