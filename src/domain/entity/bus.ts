import { PaginationDto } from './animal';
import { ReturnBusModelDto } from "./busmodel";

export interface ReturnBusDto {
    id: number;
    registrationNumber: "string";
    capacityBoundary: number;
    seatingPlace: number;
    standingPlace: number;
    busModel: ReturnBusModelDto;
}

export interface UpdateBusDto {
    id: number;
    registrationNumber: "string";
    capacityBoundary: number;
    seatingPlace: number;
    standingPlace: number;
    busModelID: number;
}

export interface ReturnBusWithPaginationDto {
    bus: Array<ReturnBusDto>;
    pagination: PaginationDto;
  }