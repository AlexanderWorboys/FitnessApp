import { useEffect, useState } from "react"
import { Text } from "../atoms";

const TimerDisplay = ({ elapsed }: { elapsed: number }) => {
  const formatElapsed = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  return <Text varient="title">{formatElapsed(elapsed)}</Text>;
};


export default TimerDisplay;