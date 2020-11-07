export interface ReturnBusModelDto {
    id: number;
    manufacturer: string;    
    model: string;
    length:	string;
    width: string;    
    height: string;
    powerTrain: string;
}


export interface CreateAndUpdateBusModelDto {
    manufacturer: string;    
    model: string;
    length:	string;
    width: string;    
    height: string;
    powerTrain: string;    
}