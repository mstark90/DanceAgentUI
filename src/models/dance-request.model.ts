import { Availability } from "./availability.model";

export interface DanceRequest {
    danceRequestId: number;
    
    availability: Availability;

    name: string;
    
    created: Date;

    status: string;
};

export interface BookDanceRequest {
    name: string;
}