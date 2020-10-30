import { PaginationDto } from '../index';

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
    pagination : PaginationDto
}
