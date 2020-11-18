import { ReturnBusModelDto } from './../../../../domain/entity/busmodel';
import { CreateBusDto, DisplayBusDto, ReturnBusDto, UpdateBusDto } from 'domain/entity/bus';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusRepositoryService } from 'domain/repository/bus-repository.service';
import { BusmodelRepositoryService } from 'domain/repository/busmodel-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusDto } from 'domain/entity/map';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-bus-bus-info-modify',
  templateUrl: './bus-info-modify.component.html',
  styleUrls: ['./bus-info-modify.component.scss']
})
export class BusBusInfoModifyComponent implements OnInit {
  busID: number = 0;
  busForm: FormGroup;
  busModels: Array<ReturnBusModelDto>;
  isSubmitBtnDisabled: boolean = false;
  bus: ReturnBusDto = {
    id: 0,
    registrationNumber: '',
    capacityBoundary: 0,
    seatingPlace: 0,
    standingPlace: 0,
    busModel: {
      id: 0,
      manufacturer: '',
      model: '',
      length: '',
      width: '',
      height: '',
      powerTrain: ''
    }
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private busModelRepositoryService: BusmodelRepositoryService,
    private busRepositoryService: BusRepositoryService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.busForm = this.fb.group({
      registrationNumber: [this.bus.registrationNumber],
      capacityBoundary: [this.bus.capacityBoundary],
      seatingPlace: [this.bus.seatingPlace],
      standingPlace: [this.bus.standingPlace],
      busModel: [this.bus.busModel.id],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.busID = params['id'];
    });

    this.getBusModelDropDown();

    if (this.busID != 0 && this.busID != undefined) {
      // get bus
      console.log(this.busID);
      this.getBusByID(this.busID);
    }
  }

  getBusByID(busID: number) {
    this.busRepositoryService.getBusByID(busID).subscribe(res => {
      this.bus = res;
      this.busForm.patchValue({
        registrationNumber: this.bus.registrationNumber,
        capacityBoundary: this.bus.capacityBoundary,
        seatingPlace: this.bus.seatingPlace,
        standingPlace: this.bus.standingPlace,
        busModel: this.bus.busModel.id,
      });
    });
  }

  getBusModelDropDown() {
    this.busModelRepositoryService.getBusModels().subscribe(
      res => {
        this.busModels = [];
        this.busModels = res;
      }
    );
  }

  ngSubmit() {
    this.isSubmitBtnDisabled = true;

    let updateBus: UpdateBusDto = {
      registrationNumber: this.busForm.get("registrationNumber").value,
      capacityBoundary: this.busForm.get("capacityBoundary").value,
      seatingPlace: this.busForm.get("seatingPlace").value,
      standingPlace: this.busForm.get("standingPlace").value,
      busModelID: this.busForm.get("busModel").value
    };

    let updateBus$ = this.busRepositoryService.updateBus(
      this.busID,
      updateBus
    );

    let createBus$ = this.busRepositoryService.createBus(
      updateBus
    );

    let successMessageTranslateUpdate$ = this.translateService.get('bus.success_updated_bus');
    let successMessageTranslateCreate$ = this.translateService.get('bus.success_create_bus');

    if (this.busID == 0 || this.busID == undefined) {
      //create new animal
      forkJoin([createBus$, successMessageTranslateCreate$]).subscribe(res => {
        console.log(res[0]);
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
        this.router.navigate(['/bus/bus-info-modify'], { queryParams: { id: res[0].id } });
      });
    } else {
      forkJoin([updateBus$, successMessageTranslateUpdate$]).subscribe(res => {
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
      });
    }

    this.isSubmitBtnDisabled = false;
  }

  ngBack() {
    this.router.navigate(['/bus/bus-overview']);
  }
}
