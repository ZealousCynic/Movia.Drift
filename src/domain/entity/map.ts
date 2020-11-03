import { BusDriverDto } from './../index';

export interface mapRoute {
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
    bus: BusDriverDto;
    busDriver: BusDriverDto;
    status: number;
    longitude: number;
    latitude: number;
}