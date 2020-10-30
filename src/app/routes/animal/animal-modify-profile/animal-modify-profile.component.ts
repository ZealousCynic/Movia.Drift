import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import {
  AnimalProfileDto,
  ReturnAnimalNatureDto,
  ReturnPlaceDto,
  UpdateAnimalProfileDto,
  AnimalRepositoryService,
  PlaceRepositoryService,
} from '../../../../domain/index';

@Component({
  selector: 'app-animal-animal-modify-profile',
  templateUrl: './animal-modify-profile.component.html',
  styleUrls: ['./animal-modify-profile.component.scss'],
})
export class AnimalAnimalModifyProfileComponent implements OnInit {
  @Input() animalID: number;
  profileForm: FormGroup;
  animalNatures: Array<ReturnAnimalNatureDto>;
  places: Array<ReturnPlaceDto>;
  isSubmitBtnDisabled: boolean = false;
  animalProfile: AnimalProfileDto = {
    id: '',
    name: '',
    scientificName: '',
    weight: '',
    height: '',
    lifeExpectancy: '',
    pregnancy: '',
    numberOfChildren: '',
    birthWeight: '',
    sexualMaturity: '',
    food: '',
    incubationTime: '',
    description: '',
    animalStatus: { id: '', isVisibility: false, longitude: '', latitude: '' },
    animalNature: { id: '', label: '' },
    place: { id: '', label: '', longitude: '', latitude: '' },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private animalRepositoryService: AnimalRepositoryService,
    private placeRepositoryService: PlaceRepositoryService
  ) {}

  ngOnInit() {
    console.log('animalID:' + this.animalID);
    this.profileForm = this.fb.group({
      name: [this.animalProfile.name, [Validators.required, Validators.maxLength(50)]],
      scientificName: [this.animalProfile.scientificName],
      weight: [this.animalProfile.weight],
      height: [this.animalProfile.height],
      lifeExpectancy: [this.animalProfile.lifeExpectancy],
      pregnancy: [this.animalProfile.pregnancy],
      numberOfChildren: [this.animalProfile.numberOfChildren],
      birthWeight: [this.animalProfile.birthWeight],
      sexualMaturity: [this.animalProfile.sexualMaturity],
      food: [this.animalProfile.food],
      incubationTime: [this.animalProfile.incubationTime],
      animalNature: [this.animalProfile.animalNature.id],
      place: [this.animalProfile.place.id],
      description: [this.animalProfile.description],
    });

    if (this.animalID == 0) {
      //create new animal
      this.createDropdownListOfPlaceAndNature();
      this.profileForm.patchValue({
        animalNature: 1,
        place: 1,
      });
    } else {
      this.getAnimalProfile();
    }
  }

  getAnimalProfile(): void {
    let animalNatures$ = this.animalRepositoryService.getAnimalNatures();
    let places$ = this.placeRepositoryService.getPlaces();
    let animalProfiles$ = this.animalRepositoryService.getAnimalProfilByID(this.animalID);
    forkJoin([animalNatures$, places$, animalProfiles$]).subscribe(
      res => {
        this.animalNatures = res[0];
        this.places = res[1];
        this.animalProfile = res[2];

        this.profileForm.patchValue({
          name: this.animalProfile.name,
          scientificName: this.animalProfile.scientificName,
          weight: this.animalProfile.weight,
          height: this.animalProfile.height,
          lifeExpectancy: this.animalProfile.lifeExpectancy,
          pregnancy: this.animalProfile.pregnancy,
          numberOfChildren: this.animalProfile.numberOfChildren,
          birthWeight: this.animalProfile.birthWeight,
          sexualMaturity: this.animalProfile.sexualMaturity,
          food: this.animalProfile.food,
          incubationTime: this.animalProfile.incubationTime,
          animalNature: this.animalProfile.animalNature.id,
          place: this.animalProfile.place.id,
          description: this.animalProfile.description,
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  createDropdownListOfPlaceAndNature(): void {
    let animalNatures$ = this.animalRepositoryService.getAnimalNatures();
    let places$ = this.placeRepositoryService.getPlaces();
    forkJoin([animalNatures$, places$]).subscribe(
      res => {
        this.animalNatures = res[0];
        this.places = res[1];
      },
      err => {
        console.log(err);
      }
    );
  }

  ngSubmit() {
    this.isSubmitBtnDisabled = true;

    let updateAnimalProfileDto: UpdateAnimalProfileDto = {
      name: this.profileForm.get('name').value,
      scientificName: this.profileForm.get('scientificName').value,
      weight: this.profileForm.get('weight').value,
      height: this.profileForm.get('height').value,
      lifeExpectancy: this.profileForm.get('lifeExpectancy').value,
      pregnancy: this.profileForm.get('pregnancy').value,
      numberOfChildren: this.profileForm.get('numberOfChildren').value,
      birthWeight: this.profileForm.get('birthWeight').value,
      sexualMaturity: this.profileForm.get('sexualMaturity').value,
      food: this.profileForm.get('food').value,
      incubationTime: this.profileForm.get('incubationTime').value,
      description: this.profileForm.get('description').value,
      animalNatureID: this.profileForm.get('animalNature').value,
      placeID: this.profileForm.get('place').value,
    };

    let updateAnimalProfile$ = this.animalRepositoryService.updateAnimalProfile(
      this.animalID,
      updateAnimalProfileDto
    );

    let createAnimalProfile$ = this.animalRepositoryService.createAnimalProfile(
      updateAnimalProfileDto
    );

    let successMessageTranslate$ = this.translateService.get('animalTable.success_updated_profile');

    if (this.animalID == 0) {
      //create new animal
      forkJoin([createAnimalProfile$, successMessageTranslate$]).subscribe(res => {
        console.log('create animal ok');
        console.log(res[0]);
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
        this.router.navigate(['/animal/animal-modify'], { queryParams: { id: res[0].id } });
      });
    } else {
      forkJoin([updateAnimalProfile$, successMessageTranslate$]).subscribe(res => {
        console.log('update animal ok');
        this.toastr.success(res[1], '', {
          timeOut: 2000,
        });
      });
    }

    this.isSubmitBtnDisabled = false;
  }

  ngBack() {
    this.router.navigate(['/animal/animal-overview']);
  }
}
