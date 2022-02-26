import { Availability } from "./availability.model";

export interface DanceRequest {
    danceRequestId: number;
    
    availability: Availability;

    firstName: string;

    lastName: string;

    emailAddress: string;
    
    created: Date;

    status: string;
};

export interface BookDanceRequest {
    firstName: string;
    lastName: string;
    emailAddress: string;
}