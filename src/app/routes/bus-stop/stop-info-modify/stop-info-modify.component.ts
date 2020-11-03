import { BusStopProfileDto, UpdateBusStopProfileDto } from './../../../../domain/entity/busstop';
import { BusStopDto } from 'domain/entity/busstop';
import { BusstopRepositoryService } from 'domain/repository/busstop-repository.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bus-stop-stop-info-modify',
  templateUrl: './stop-info-modify.component.html',
  styleUrls: ['./stop-info-modify.component.scss'],
})
export class BusStopStopInfoModifyComponent implements OnInit {
  @Input()
  busStopID: number;
  busStopForm: FormGroup;
  isSubmitBtnDisabled: boolean = false;
  busStop: BusStopProfileDto = {
    id: '',
    label: '',
    stopNumber: '',
    longitude: '',
    latitude: '',
    zone: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private BusstopRepositoryService: BusstopRepositoryService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.busStopID = params['id'] || 0;
    });
    console.log('BusStopID:' + this.busStopID);
    // create form groupe to bus stop
    this.busStopForm = this.fb.group({
      lable: [this.busStop.label, [Validators.required, Validators.maxLength(50)]],
      stopNumber: [this.busStop.stopNumber],
      longitude: [this.busStop.longitude],
      latitude: [this.busStop.latitude],
      zone: [this.busStop.zone],
    });

    if (this.busStopID != 0) {
      this.getBusStopData();
    }
  }

  getBusStopData(): void {
    this.BusstopRepositoryService.getBusStopOnID(this.busStopID).subscribe(
      res => {
        // update the bus-stop
        this.busStop = res;

        // set the form data
        this.busStopForm.patchValue({
          stopNumber: this.busStop.stopNumber,
          lable: this.busStop.label,
          longitude: this.busStop.longitude,
          latitude: this.busStop.latitude,
          zone: this.busStop.zone,
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  ngSubmit() {
    this.isSubmitBtnDisabled = true;

    let updateBusStop: UpdateBusStopProfileDto = {
      stopNumber: this.busStopForm.get('stopNumber').value,
      label: this.busStopForm.get('lable').value,
      longitude: this.busStopForm.get('longitude').value,
      latitude: this.busStopForm.get('latitude').value,
      zone: this.busStopForm.get('zone').value,
    };

    // ready update object
    let updateBusStop$ = this.BusstopRepositoryService.updateBusStop(
      this.busStopID,
      updateBusStop
    );

    // ready create object
    let createBusStop$ = this.BusstopRepositoryService.createBusStop(updateBusStop);

    // get translate service
    let successMessageTranslate$ = this.translateService.get('animalTable.success_updated_profile');

    // check if we need to update or create a new bus stop
    if (this.busStopID == 0) {
      //create new bus stop
      forkJoin([createBusStop$, successMessageTranslate$]).subscribe(res => {
        console.log('create bus stop ok');
        console.log(res[0]);
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
        // rediret to current page but with the newley created id from the database
        this.router.navigate(['/bus-stop/stop-info-modify'], { queryParams: { id: res[0].id } });
      });
    } else {
      forkJoin([updateBusStop$, successMessageTranslate$]).subscribe(res => {
        console.log('update bus stop ok');
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
      });
    }

    this.isSubmitBtnDisabled = false;
  }

  ngBack() {
    this.router.navigate(['/bus-stop/stop-overview']);
  }
}
