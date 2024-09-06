// Universally used types

// Define a flexible function type
export type UnknownFunction = (...args: any[]) => any;

// Define the timing type
export type Timing = 'Morning' | 'Noon' | 'Afternoon' | 'Night';

// Define a type for a routine step
export type RoutineStep = {
    order: number;
    itemType: string;
    itemBrand: string | null;
};

// Define the routine steps type
export interface RoutineSteps {
    Morning: RoutineStep[];
    Noon: RoutineStep[];
    Afternoon: RoutineStep[];
    Night: RoutineStep[];
};

// Define the Routine type
export type Routine = {
    routineId: string | null;
    routineName: string;
    daysLogged: number;
    routineSteps: RoutineSteps;
};

// Define Routines type
export type Routines = {
    userId: string | null;
    routines: Routine[];
};


// Define checkinArea type
interface ImageFile {
    name: string;
    type: string;
    uri: string;
}
export interface CheckinArea {
    areaId: string | null;
    areaName: string;
    placeholderPictureURI: string;
    picture: ImageFile | null,
    pictureURI: string | null;
    userRating: number | null;
};

// Define type for a checkin
export type Checkin = {
    checkinAreas: { [areaId: string]: CheckinArea };
    checkinId: string | null;
    userId: string | null;
    checkinDate: Date | null;
    routineId: string | null;
};