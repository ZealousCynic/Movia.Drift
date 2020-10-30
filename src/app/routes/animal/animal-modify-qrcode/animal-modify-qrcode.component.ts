import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import {
  ReturnAnimalQRCodeDto,
  UpdateAnimalQRCodeDto,
  AnimalRepositoryService,
} from '../../../../domain/index';

@Component({
  selector: 'app-animal-animal-modify-QRCode',
  templateUrl: './animal-modify-qrcode.component.html',
  styleUrls: ['./animal-modify-qrcode.component.scss'],
})
export class AnimalAnimalModifyQRCodeComponent implements OnInit {
  @Input() animalID: number;
  animalQRCode: ReturnAnimalQRCodeDto = <ReturnAnimalQRCodeDto>{
    id: '',
    qrCodeString: '',
    path: '',
  };
  profileForm: FormGroup;
  isSubmitBtnDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,    
    private animalRepositoryService: AnimalRepositoryService
  ) {
    // this.animalQRCode = <ReturnAnimalQRCodeDto>{
    //   id: '1',
    //   qrCodeString: '',
    //   path: 'assets/images/qrcode.png',
    // };
  }

  ngOnInit() {
    console.log('animalID:' + this.animalID);

    this.profileForm = this.fb.group({
      id: [this.animalQRCode.id],
      qrCodeString: [
        this.animalQRCode.qrCodeString,
        [Validators.required, Validators.minLength(5)],
      ],
      path: [this.animalQRCode.path],
    });

    this.getAnimalQRCode(this.animalID);
  }

  getAnimalQRCode(animalProfileID: number): void {
    this.animalRepositoryService
      .getQRCodeByIDOfAnimalProfil(animalProfileID)
      .subscribe(
        res => {
          this.animalQRCode = <ReturnAnimalQRCodeDto>{
            id: res.id,
            qrCodeString: res.qrCodeString,
            path: res.path  + '?random+\=' + Math.random()
          };

          this.profileForm.patchValue({
            id: this.animalQRCode.id,
            qrCodeString: this.animalQRCode.qrCodeString,
            path: this.animalQRCode.path + '?random+\=' + Math.random()
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  ngBack() {
    this.router.navigate(['/animal/animal-overview']);
  }

  ngSubmit() {
    this.isSubmitBtnDisabled = true;
    console.log(this.profileForm.value);

    let updateAnimalQRCodeDto: UpdateAnimalQRCodeDto = {
      qrCodeString: this.profileForm.get('qrCodeString').value
    };
    let createQRCode$ = this.animalRepositoryService.createQRCode(
      this.animalID,
      updateAnimalQRCodeDto
    );
    let successMessageTranslate$ = this.translateService.get('animalTable.success_updated_qrcode');

    forkJoin([createQRCode$, successMessageTranslate$]).subscribe(res => {
      this.toastr.success(res[1], '', {
        timeOut: 2000,
      });      
      this.getAnimalQRCode(this.animalID);
    });    
    this.isSubmitBtnDisabled = false;    

  }
}
