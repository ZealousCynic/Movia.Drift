import { PaginationDto } from './animal';

export interface BusDriverDto {
    id: number;
    personnelNumber: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface RerturnBusDriverDtoWithHeader {
    busDriverDtos:Array<BusDriverDto>;
    pagination:PaginationDto;
}

export interface UpdateBusDriver {
    personnelNumber: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}