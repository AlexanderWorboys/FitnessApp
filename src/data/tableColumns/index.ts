import { ExerciseType } from "../../types/workout";
import { distanceColumns } from "./distanceColumns";
import { timedColumns } from "./timedColumns";
import { weightColumns } from "./weightColumns";

export const getColumnsForType = (type: ExerciseType) => {
    switch (type) {
        case "weight":
            return weightColumns;
        case "timed":
            return timedColumns;
        case "distance":
            return distanceColumns
        default:
            return [];
    }
};