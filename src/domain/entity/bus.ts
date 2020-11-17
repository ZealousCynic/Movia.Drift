import { PaginationDto } from './animal';
import { CreateAndUpdateBusModelDto, ReturnBusModelDto } from "./busmodel";

export interface ReturnBusDto {
    id: number;
    registrationNumber: string;
    capacityBoundary: number;
    seatingPlace: number;
    standingPlace: number;
    busModel: ReturnBusModelDto;
}

export interface DisplayBusDto {
    registrationNumber: string;
    capacityBoundary: string;
    seatingPlace: string;
    standingPlace: string;
    busModel: CreateAndUpdateBusModelDto;
}

export interface UpdateBusDto {
    registrationNumber: string;
    capacityBoundary: number;
    seatingPlace: number;
    standingPlace: number;
    busModelID: number;
}

export interface ReturnBusWithPaginationDto {
    bus: Array<ReturnBusDto>;
    pagination: PaginationDto;
  }