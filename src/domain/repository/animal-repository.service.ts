import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ReturnAnimalProfileDto,
  ReturnAnimalPictureDto,
  ReturnAnimalNatureDto,
  ReturnAnimalSoundDto,
  ReturnAnimalQRCodeDto,
  UpdateAnimalProfileDto,
  UpdateStatusOfAnimalPictureDto,
  ReturnAnimalProfilesWithPaginationDto,
  UpdateAnimalQRCodeDto,
  UpdateAnimalStatusDto,
  PaginationDto,
} from '../entity/animal';
import { BooleanInput } from '@angular/cdk/coercion';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalRepositoryService {
  private createPictureOfAnimalUrl = 'http://localhost:5000/api/v1/animalprofiles/pictures/1​';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };
  constructor(private http: HttpClient) {}

  // createPictureOfAnimal(formData: FormData): Observable<ReturnAnimalPictureDto> {
  //   return this.http.post<ReturnAnimalPictureDto>(this.createPictureOfAnimalUrl, formData);
  // }

  getAnimalProfils(): Observable<Array<ReturnAnimalProfileDto>> {
    return this.http.get<Array<ReturnAnimalProfileDto>>(
      environment.apiUrlV1 + 'animalprofiles?PageSize=12'
    );
  }

  getAnimalProfilsWithHeader(
    paginationDto: PaginationDto
  ): Observable<ReturnAnimalProfilesWithPaginationDto> {
    let params = new HttpParams()
      .set('PageNumber', paginationDto.CurrentPage.toString())
      .set('PageSize', paginationDto.PageSize.toString());
    return this.http
      .get<any>(environment.apiUrlV1 + 'animalprofiles', { params: params, observe: 'response' })
      .pipe(
        map(res => {
          return {
            animalProfiles: res.body,
            pagination: JSON.parse(res.headers.get('x-pagination')),
          } as ReturnAnimalProfilesWithPaginationDto;
        })
      );
  }

  getAnimalProfilByID(animalProfileID: number): Observable<ReturnAnimalProfileDto> {
    return this.http.get<ReturnAnimalProfileDto>(
      environment.apiUrlV1 + `animalprofiles/${animalProfileID}`
    );
  }

  getAnimalNatures(): Observable<Array<ReturnAnimalNatureDto>> {
    return this.http.get<Array<ReturnAnimalNatureDto>>(
      environment.apiUrlV1 + 'animalprofiles/natures'
    );
  }

  updateAnimalProfile(
    animalProfileID: number,
    updateAnimalProfileDto: UpdateAnimalProfileDto
  ): Observable<ReturnAnimalProfileDto> {
    return this.http.put<ReturnAnimalProfileDto>(
      environment.apiUrlV1 + `animalprofiles/${animalProfileID}`,
      updateAnimalProfileDto
    );
  }

  deleteAnimalProfile(animalProfileID: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrlV1 + `animalprofiles/${animalProfileID}`);
  }

  createAnimalProfile(
    updateAnimalProfileDto: UpdateAnimalProfileDto
  ): Observable<ReturnAnimalProfileDto> {
    return this.http.post<ReturnAnimalProfileDto>(
      environment.apiUrlV1 + `animalprofiles`,
      updateAnimalProfileDto
    );
  }

  getPicturesOfAnimal(animalProfileID: number): Observable<Array<ReturnAnimalPictureDto>> {
    return this.http
      .get<Array<ReturnAnimalPictureDto>>(
        environment.apiUrlV1 + `animalprofiles/pictures/${animalProfileID}`
      )
      .pipe(
        map(res => {
          res.forEach(picture => {
            picture.path = environment.assetsResourcesUrl + picture.path;
          });
          return res;
        })
      );
  }

  createPictureOfAnimal(
    animalProfileID: number,
    formData: FormData
  ): Observable<ReturnAnimalPictureDto> {
    return this.http.post<ReturnAnimalPictureDto>(
      environment.apiUrlV1 + `animalprofiles/pictures/${animalProfileID}`,
      formData
    );
  }

  deletePicturesOfAnimal(pictureID: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrlV1 + `animalprofiles/pictures/${pictureID}`);
  }

  updateTypeOfPicture(
    pictureID: number,
    updateStatusOfAnimalPictureDto: UpdateStatusOfAnimalPictureDto
  ): Observable<ReturnAnimalPictureDto> {
    return this.http.put<ReturnAnimalPictureDto>(
      environment.apiUrlV1 + `animalprofiles/pictures/${pictureID}/picturetype`,
      updateStatusOfAnimalPictureDto
    );
  }

  getSoundOfAnimal(animalProfileID: number): Observable<Array<ReturnAnimalSoundDto>> {
    return this.http
      .get<Array<ReturnAnimalSoundDto>>(
        environment.apiUrlV1 + `animalprofiles/sounds/${animalProfileID}`
      )
      .pipe(
        map(res => {
          res.forEach(picture => {
            picture.path = environment.assetsResourcesUrl + picture.path;
          });
          return res;
        })
      );
  }

  createSoundOfAnimal(
    animalProfileID: number,
    formData: FormData
  ): Observable<ReturnAnimalSoundDto> {
    return this.http.post<ReturnAnimalSoundDto>(
      environment.apiUrlV1 + `animalprofiles/sounds/${animalProfileID}`,
      formData
    );
  }

  deleteSoundOfAnimal(soundID: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrlV1 + `animalprofiles/sounds/${soundID}`);
  }

  getQRCodeByIDOfAnimalProfil(animalProfileID: number): Observable<ReturnAnimalQRCodeDto> {
    return this.http
      .get<ReturnAnimalProfileDto>(environment.apiUrlV1 + `animalprofiles/${animalProfileID}`)
      .pipe(
        map(res => {
          res.animalQRCode.path = environment.assetsResourcesUrl + res.animalQRCode.path;
          return res.animalQRCode;
        })
      );
  }

  createQRCode(
    animalProfileID: number,
    updateAnimalQRCodeDto: UpdateAnimalQRCodeDto
  ): Observable<ReturnAnimalQRCodeDto> {
    return this.http.post<ReturnAnimalQRCodeDto>(
      environment.apiUrlV1 + `animalprofiles/qrcode/${animalProfileID}`,
      updateAnimalQRCodeDto
    );
  }

  updateAnimalStatus(
    animalProfileID: number,
    updateAnimalStatusDto: UpdateAnimalStatusDto
  ): Observable<ReturnAnimalQRCodeDto> {
    return this.http.post<ReturnAnimalQRCodeDto>(
      environment.apiUrlV1 + `animalprofiles/status/${animalProfileID}`,
      updateAnimalStatusDto
    );
  }
  // createPictureOfAnimal(formData: FormData): Observable<ReturnAnimalPictureDto> {
  //   return this.http.post<ReturnAnimalPictureDto>(this.createPictureOfAnimalUrl, formData)
  // }

  // createPictureOfAnimal(): Observable<string> {
  //   return this.http.post<string>(this.createPictureOfAnimalUrl, null)
  // }
}
