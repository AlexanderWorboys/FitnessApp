import { ExerciseType, setEntry } from "../../types/workout";
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

export const createEmptySet = (type: ExerciseType, setNumber: number): setEntry => {
  switch (type) {
    case "weight":
      return {
        id: Date.now().toString(),
        setNumber,
        kg: 0,
        reps: 0,
        complete: false,
      };

    case "timed":
      return {
        id: Date.now().toString(),
        setNumber,
        time: "00:00",
        complete: false,
      };

    case "distance":
      return {
        id: Date.now().toString(),
        setNumber,
        km: 0,
        time: "00:00",
        complete: false,
      };

    default:
      return {
        id: Date.now().toString(),
        setNumber,
        complete: false,
      };
  }
};
