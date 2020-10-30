import { ReturnPlaceDto } from './place';

export interface AnimalProfileDto {
  id: string;
  name: string;
  scientificName: string;
  weight: string;
  height: string;
  lifeExpectancy: string;
  pregnancy: string;
  numberOfChildren: string;
  birthWeight: string;
  sexualMaturity: string;
  food: string;
  incubationTime: string;
  description: string;
  animalStatus: ReturnAnimalStatusDto;
  animalNature: ReturnAnimalNatureDto;
  place: ReturnPlaceDto;
}

export interface ReturnAnimalProfileDto {
  id: string;
  name: string;
  scientificName: string;
  weight: string;
  height: string;
  lifeExpectancy: string;
  pregnancy: string;
  numberOfChildren: string;
  birthWeight: string;
  sexualMaturity: string;
  food: string;
  incubationTime: string;
  description: string;
  animalStatus: ReturnAnimalStatusDto;
  animalNature: ReturnAnimalNatureDto;
  animalQRCode: ReturnAnimalQRCodeDto;  
  place: ReturnPlaceDto;
}

export interface ReturnAnimalStatusDto {
  id: string;
  isVisibility: boolean;
  longitude: string;
  latitude: string;
}
export interface ReturnAnimalNatureDto {
  id: string;
  label: string;
}

export interface ReturnAnimalPictureDto {
  id: string;
  path: string;
  animalProfileID: string;
  pictureTypeID: string;
}

export interface ReturnAnimalSoundDto {
  id: string;
  path: string;
  animalProfileID: string;
}

export interface ReturnAnimalQRCodeDto {
  id: string;
  qrCodeString: string;
  path: string;
}

export interface UpdateAnimalProfileDto {
  name: string;
  scientificName: string;
  weight: string;
  height: string;
  lifeExpectancy: string;
  pregnancy: string;
  numberOfChildren: string;
  birthWeight: string;
  sexualMaturity: string;
  food: string;
  incubationTime: string;
  description: string;
  animalNatureID: number;
  placeID: number;
}

export interface UpdateStatusOfAnimalPictureDto {
  pictureTypeID: number;
}

export interface UpdateAnimalQRCodeDto {
  qrCodeString: string;
}

export interface PaginationDto {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalCount: number;
  HasPrevious: boolean;
  HasNext: boolean;
}

export interface ReturnAnimalProfilesWithPaginationDto {
  animalProfiles: Array<ReturnAnimalProfileDto>;
  pagination: PaginationDto;
}

export interface UpdateAnimalStatusDto {
  isVisibility: boolean;
  longitude: number;
  latitude: number;
}