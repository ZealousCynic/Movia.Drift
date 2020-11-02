export interface ReturnRouteDto 
{
    id : number;
    label : string;
    description : string;
}

export interface CreateAndUpdateRouteDto 
{
    label : string;
    description : string;
}
  
export interface ReturnRouteBusStopDto 
{
    id: number;
    stopNumber: string;
    label: string;
    zone: number;
    longitude: number;
    latitude: number;
}

export interface ReturnBusStopWithOrderDto
{
    order: number;
    busStop: ReturnRouteBusStopDto;
}

export interface RoutePaginationDto {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
    HasPrevious: boolean;
    HasNext: boolean;
}

export interface ReturnRouteBusDto {
    id: number;
    registrationNumber: string;
    capacityBoundary: number;
    seatingPlace: number;
    standingPlace: number;
    busModel: ReturnRouteBusModelDto;
}

export interface ReturnRouteBusModelDto {
    id: number;
    manufacturer: string;
    model: string;
    length: string;
    width: string;    
    height: string;
    powerTrain: string;
}

export interface ReturnRouteBusDriverlDto {
  id: number;
  personnelNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ReturnBusAndDriverInRouteDto {
    bus: ReturnRouteBusDto;
    busDriver: ReturnRouteBusDriverlDto;
    status: number;
    longitude: number;
    latitude: number;
}

export interface BusWithDriverDto{
    busID: number;
    busDriverID: number;
}