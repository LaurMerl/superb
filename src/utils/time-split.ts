export type HoursMinutes = {
  hours: number;
  minutes: number;
};

export function timeSplit(time: string): HoursMinutes {
  const timeSeparated = time.split(':');
  return {
    hours: Number(timeSeparated[0]),
    minutes: Number(timeSeparated[1]),
  };
}
