import { BusDriverDto, ReturnBusStopWithOrderDto } from './../index';

export class mapRoute {
    routeCordinates: Array<LatLon>;
    bus: Bus;
}

export interface LatLon {
    latitude: number;
    longitude: number;
}

export interface Bus {
    cordinates: LatLon;
    busNumber: string;
}

export interface RunningBus {
    id: number;
    routeID: number;
    bus: BusDto;
    busDriver: BusDriverDto;
    status: number;
    longitude: number;
    latitude: number;
}

export interface RunningBusWithRouteBusStops {
    id: number;
    route: Array<ReturnBusStopWithOrderDto>;
    bus: BusDto;
    busDriver: BusDriverDto;
    status: number;
    longitude: number;
    latitude: number;
}

export interface BusDto {
    id: number;
    registrationNumber: string;
    capacityBoundary: number;
    seatingPlace: number;
    standingPlace: number;
}

export interface BusModel {
    id: number;
    manufacturer: string;
    model: string;
    length: string;
    width: string;
    height: string;
    powerTrain: string;
}