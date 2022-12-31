import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";

export function convertUnixToTime(unix_timestamp: number): Date {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unix_timestamp * 1000);

  return date;
}

export function checkForTodayOrTommorow(mDate: Date): string {
  const today = new Date();

  if (mDate.getDay() === today.getDay()) {
    return "Today";
  } else if (mDate.getDay() === today.getDay() + 1) {
    return "Tomorrow";
  } else {
    return "none";
  }
}

export function degToCompass(num: number) {
  let val = Math.round(num / 22.5 + 0.5);
  let arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

export function arrayRotate(arr: any[], count: number) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}
