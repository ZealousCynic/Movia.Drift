import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UpdateBusDriver } from 'domain/entity/busdriver';
import { BusdriverRepositoryService } from 'domain/repository/busdriver-repository.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bus-driver-driver-info-modify',
  templateUrl: './driver-info-modify.component.html',
  styleUrls: ['./driver-info-modify.component.scss']
})
export class BusDriverDriverInfoModifyComponent implements OnInit {
  @Input() 
  busDriverID: number;
  busDriverForm: FormGroup;
  isSubmitBtnDisabled: boolean = false;
  busDriver: UpdateBusDriver = {
    personnelNumber: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private busDriverRepositoryService: BusdriverRepositoryService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.busDriverID = params['id'] || 0;
    });
    console.log('busDriverID:' + this.busDriverID);
    this.busDriverForm = this.fb.group({
      personnelNumber: [this.busDriver.personnelNumber],
      firstName: [this.busDriver.firstName],
      lastName: [this.busDriver.lastName],
      phoneNumber: [this.busDriver.phoneNumber]
    });

    if (this.busDriverID != 0)
      this.getBusDriver(this.busDriverID);

  }

  getBusDriver(busDriverID: number): void {
    this.busDriverRepositoryService.getBusDriverByID(busDriverID).subscribe(
      res => {
        this.busDriver = res;
        this.busDriverForm.patchValue({
          personnelNumber: this.busDriver.personnelNumber,
          firstName: this.busDriver.firstName,
          lastName: this.busDriver.lastName,
          phoneNumber: this.busDriver.phoneNumber
        });
      },
      err => {
        console.log('err');
      }
    );
  }


  ngSubmit() {
    this.isSubmitBtnDisabled = true;

    let updateBusDriver: UpdateBusDriver = {
      personnelNumber: this.busDriverForm.get('personnelNumber').value,
      firstName: this.busDriverForm.get('firstName').value,
      lastName: this.busDriverForm.get('lastName').value,
      phoneNumber: this.busDriverForm.get('phoneNumber').value
    };

    let updateBusDriver$ = this.busDriverRepositoryService.updateBusDriver(
      this.busDriverID,
      updateBusDriver
    );

    let createBusDriver$ = this.busDriverRepositoryService.createBusDriver(
      updateBusDriver
    );

    let successMessageTranslate$ = this.translateService.get('.success_updated_profile');

    if (this.busDriverID == 0) {
      //create new animal
      forkJoin([createBusDriver$, successMessageTranslate$]).subscribe(res => {
        console.log('create bus driver ok');
        console.log(res[0]);
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
        this.router.navigate(['bus-driver/driver-info-modify'], { queryParams: { id: res[0].id } });
      });
    } else {
      forkJoin([updateBusDriver$, successMessageTranslate$]).subscribe(res => {
        console.log('update bus driver ok');
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
      });
    }

    this.isSubmitBtnDisabled = false;
  }

  ngBack() {
    this.router.navigate(['bus-driver/driver-overview']);
  }
}
