export const formatDateToISO = (date: Date): string => {
  return date.toISOString().substring(0, 10).replace("/", "-");
};

export const formatDuration = (duration: string): string => {
  return duration.replace("PT", "").replace("H", "h ").replace("M", "m");
};

export const formatISOToDate = (date: string): string => {
  let test: Date = new Date(date);
  return test.toDateString() + " " + test.toLocaleTimeString();
};

export const formatISOToTime = (date: string): string => {
  return new Date(date).toLocaleTimeString();
};

export const getLayoverTime = (date1: string, date2: string): string => {
  let arrival = new Date(date1);
  let departure = new Date(date2);
  let diff = departure.getTime() - arrival.getTime();
  const SEC = 1000,
    MIN = 60 * SEC,
    HRS = 60 * MIN;
  const humanDiff = `${Math.floor(diff / HRS)}h ${Math.floor((diff % HRS) / MIN).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}m`;
  return humanDiff;
};
