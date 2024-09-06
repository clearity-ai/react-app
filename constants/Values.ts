// A place to define the initial values of some states
import { Checkin, Routine, RoutineSteps, Timing } from "@/constants/Types";

// Constant timing values
export const timings: Timing[] = ["Morning", "Noon", "Afternoon", "Night"]

// Initial values for routinesData
const initialRoutineSteps: RoutineSteps = {
    Morning: [
        { order: 1, itemType: "Water", itemBrand: null },
        { order: 2, itemType: "Cleanser", itemBrand: "CeraVe" },
        { order: 3, itemType: "Sunscreen", itemBrand: "La Roche-Posay" },
    ],
    Noon: [],
    Afternoon: [
        { order: 1, itemType: "Water", itemBrand: null },
    ],
    Night: [
        { order: 1, itemType: "Water", itemBrand: null },
        { order: 2, itemType: "Moisturizer", itemBrand: "CeraVe" },
    ],
}
const initialRoutineSteps2: RoutineSteps = { ...initialRoutineSteps };
initialRoutineSteps2.Night = [
    { order: 1, itemType: "Water", itemBrand: null },
    { order: 2, itemType: "Dermaroller", itemBrand: "Banish" },
    { order: 3, itemType: "Water", itemBrand: null },
    { order: 3, itemType: "Niacinimide Serum", itemBrand: "The Ordinary" },
]
export const emptyRoutine: Routine = {
    routineId: "placeholderRoutineId",
    routineName: "",
    daysLogged: 0,
    routineSteps: {
        Morning: [],
        Noon: [],
        Afternoon: [],
        Night: [],
    },
};
export const initialRoutinesArray: Routine[] = [
    {
        routineId: "0",
        routineName: "Example Routine",
        daysLogged: 0,
        routineSteps: initialRoutineSteps,
    },
    {
        routineId: "1",
        routineName: "Weekly Dermarolling",
        daysLogged: 0,
        routineSteps: initialRoutineSteps2,
    },
];


// Initial values for checkinData
const initialCheckinAreas = {
    0: {
        areaId: "0",
        areaName: "Face Frontal",
        picture: null,
        pictureURI: null,
        placeholderPictureURI: require('@/assets/images/default-face-frontal.png'),
        userRating: null,
    },
    1: {
        areaId: "1",
        areaName: "Face Left",
        picture: null,
        pictureURI: null,
        placeholderPictureURI: require('@/assets/images/default-face-left.png'),
        userRating: null,
    },
    2: {
        areaId: "2",
        areaName: "Face Right",
        picture: null,
        pictureURI: null,
        placeholderPictureURI: require('@/assets/images/default-face-right.png'),
        userRating: null,
    },
    3: {
        areaId: "3",
        areaName: "Neck & Chest",
        picture: null,
        pictureURI: null,
        placeholderPictureURI: require('@/assets/images/default-neck-chest.png'),
        userRating: null,
    },
}
export const initialCheckinData: Checkin = {
    checkinAreas: initialCheckinAreas,
    checkinId: null,
    userId: null,
    checkinDate: null,
    routineId: null,
};

// Mock values for infoCardData
const lastRoutineName = "Simple Routine"
const streakDays = 12
const lastCheckinTime = "30"
export const infoCardData = [
    {
        backgroundColorName: "tint",
        foregroundColorName: "background",
        iconName: "shimmer",
        infoTitleText: "Last Routine",
        infoMainText: lastRoutineName,
        infoUnitText: "",
        infoDetailText: "used in check-in"
    },
    {
        backgroundColorName: "tintPrimaryLighter",
        foregroundColorName: "tintPrimaryDarker",
        iconName: "progress-check",
        infoTitleText: "Progress Tracking",
        infoMainText: streakDays.toString(),
        infoUnitText: "days in a row",
        infoDetailText: "updated " + lastCheckinTime + " mins ago"
    },
]

// Mock values for tipCardData
export const tipCardData = {
    imageURI: "https://picsum.photos/200/400",
    tipTitleText: "Skincare Tip #312",
    tipMainText: "Less is more when it comes to skin care. Using too many products can irritate your skin. Instead, focus on the basics, such as a gentle cleanser, sunscreen, and moisturizer.",
}