import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CreateAndUpdateRouteDto, RouteRepositoryService } from '../../../../domain/index';


@Component({
  selector: 'app-bus-route-route-info-modify',
  templateUrl: './route-info-modify.component.html',
  styleUrls: ['./route-info-modify.component.scss']
})
export class BusRouteRouteInfoModifyComponent implements OnInit {

  @Input() routeId: number = 0;
  routeInfoForm: FormGroup;
  routeInfo: CreateAndUpdateRouteDto = {
    label: '',
    description: ''
  };  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,   
    private routeRepositoryService: RouteRepositoryService 
  ) { }

  ngOnInit() {
    this.routeInfoForm = this.fb.group({
      label: [this.routeInfo.label, [Validators.required, Validators.maxLength(50)]],
      description: [this.routeInfo.description, [Validators.required, Validators.maxLength(50)]]
    });

    if (this.routeId > 0)
    {
      this.getRouteById();
    }    
  }

  getRouteById(): void {
    let route$ = this.routeRepositoryService.getRouteById(this.routeId);

    forkJoin([route$]).subscribe(
      res => {
        this.routeInfo = res[0];
        this.routeInfoForm.patchValue({
          label: this.routeInfo.label,
          description: this.routeInfo.description
        });
      },
      err => {
        console.log(err);
      }
    );
  }  

  ngBack() {
    this.router.navigate(['/bus-route/route-overview']);
  }
  
  ngSubmit() {

    let createRoute: CreateAndUpdateRouteDto = {
      label: this.routeInfoForm.get('label').value,
      description: this.routeInfoForm.get('description').value
    };

    let successMessageTranslate$ = this.translateService.get('bus_route.success_updated_route');

    if (this.routeId == 0) {
      //create new route      
      let createRoute$ = this.routeRepositoryService.createRoute(createRoute);      
      forkJoin([createRoute$, successMessageTranslate$]).subscribe(res => {
        console.log(res[0]);
        this.toastr.success(res[1], '', {
          timeOut: 3000,
        });
        this.router.navigate(['/bus-route/route-wrapper-modify'], { queryParams: { id: res[0].id } });
      });
    } else {
      let updateRoute$ = this.routeRepositoryService.updateRoute(
        this.routeId,
        createRoute
      );
      forkJoin([updateRoute$, successMessageTranslate$]).subscribe(res => {
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
      });
    }    
    
  }

}
