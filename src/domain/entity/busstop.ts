import { PaginationDto } from '../index';

export interface BusStopProfileDto{
    id: string;
    stopNumber: string;
    label: string;
    longitude: string;
    latitude: string;
    zone: string;
}

export interface UpdateBusStopProfileDto{
    stopNumber: string;
    label: string;
    longitude: string;
    latitude: string;
    zone: string;
}

export interface BusStopDto {
    id: number;
    stopNumber: string;
    label: string;
    longitude: number;
    latitude: number;
    zone: number;
}

export interface BusStopPageWithPaginationDto{
    busStopDto: Array<BusStopDto>;
    pagination : PaginationDto;
}
