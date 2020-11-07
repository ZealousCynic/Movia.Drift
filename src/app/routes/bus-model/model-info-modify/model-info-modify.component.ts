import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CreateAndUpdateBusModelDto, BusmodelRepositoryService } from '../../../../domain/index';

@Component({
  selector: 'app-bus-model-model-info-modify',
  templateUrl: './model-info-modify.component.html',
  styleUrls: ['./model-info-modify.component.scss']
})
export class BusModelModelInfoModifyComponent implements OnInit {
  @Input() busModelId: number = 0;
  busModelInfoForm: FormGroup;
  busModelInfo: CreateAndUpdateBusModelDto = {
    manufacturer: '',
    model: '',
    length:	'',
    width: '',
    height: '',
    powerTrain: ''
  };  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private translateService: TranslateService,   
    private busModelRepositoryService: BusmodelRepositoryService     
  ) { }

  ngOnInit() {
    
    this.activedRoute.queryParams.subscribe(
      params => {        
        this.busModelId = params['id'] || 0;
      }
    );

    this.busModelInfoForm = this.fb.group({
      manufacturer: [this.busModelInfo.manufacturer, [Validators.required, Validators.maxLength(50)]],
      model: [this.busModelInfo.model, [Validators.required, Validators.maxLength(50)]],
      length: [this.busModelInfo.length],
      width: [this.busModelInfo.width],
      height: [this.busModelInfo.height],
      powerTrain: [this.busModelInfo.powerTrain]
    });

    if (this.busModelId > 0)
    {
      this.getBusModelById();
    }      
  }

  getBusModelById(): void {

    console.log()
    let busModel$ = this.busModelRepositoryService.getBusModelsById(this.busModelId);

    forkJoin([busModel$]).subscribe(
      res => {
        this.busModelInfo = res[0];
        this.busModelInfoForm.patchValue({
          manufacturer: this.busModelInfo.manufacturer,
          model: this.busModelInfo.model,
          length: this.busModelInfo.length,
          width: this.busModelInfo.width,
          height: this.busModelInfo.height,
          powerTrain: this.busModelInfo.powerTrain
        });
      },
      err => {
        console.log(err);
      }
    );
  }    

  ngBack() {
    this.router.navigate(['/bus-model/model-overview']);
  }  

  ngSubmit() {
    
    console.log('busModelInfo:');
    console.log(this.busModelInfo);
    let createBusModel: CreateAndUpdateBusModelDto = {
      manufacturer: this.busModelInfoForm.get('manufacturer').value,
      model: this.busModelInfoForm.get('model').value,
      length: this.busModelInfoForm.get('length').value,
      width: this.busModelInfoForm.get('width').value,
      height: this.busModelInfoForm.get('height').value,
      powerTrain: this.busModelInfoForm.get('powerTrain').value
    };

    let successMessageTranslate$ = this.translateService.get('bus_route.success_updated_route');

    if (this.busModelId == 0) {
      //create new bus model      
      let createRoute$ = this.busModelRepositoryService.createBusModel(createBusModel);      
      forkJoin([createRoute$, successMessageTranslate$]).subscribe(res => {
        console.log(res[0]);
        this.toastr.success(res[1], '', {
          timeOut: 3000,
        });
        this.router.navigate(['/bus-model/model-overview']);
      });
    } else {
      let updateBusModel$ = this.busModelRepositoryService.updateBusModel(
        this.busModelId,
        createBusModel
      );
      forkJoin([updateBusModel$, successMessageTranslate$]).subscribe(res => {
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
      });
    }    
  }

}
