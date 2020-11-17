import { ReturnBusModelDto } from './../../../../domain/entity/busmodel';
import { DisplayBusDto, ReturnBusDto, UpdateBusDto } from 'domain/entity/bus';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bus-bus-info-modify',
  templateUrl: './bus-info-modify.component.html',
  styleUrls: ['./bus-info-modify.component.scss']
})
export class BusBusInfoModifyComponent implements OnInit {
  @Input() animalID: number;
  profileForm: FormGroup;
  animalNatures: Array<ReturnBusDto>;
  isSubmitBtnDisabled: boolean = false;
  bus: DisplayBusDto = {
    registrationNumber: '',
    capacityBoundary: '',
    seatingPlace: '',
    standingPlace: '',
    busModel: {
      manufacturer: '',
      model: '',
      length: '',
      width: '',
      height: '',
      powerTrain: ''
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
