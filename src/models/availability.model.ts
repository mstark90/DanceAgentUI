
export interface Availability {
    availabilityId: number;

    dancerName: string;
    
    location: string;
    
    startTime: Date;
    
    endTime: Date;
    
    danceLimit: number;

    created: Date;
};

export interface AvailabilityRequest {
    availabilityId: number;
    
    location: string;
    
    startTime: Date;
    
    endTime: Date;
    
    danceLimit: number;
}