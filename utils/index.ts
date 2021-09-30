/**
 * This function create a new date based on arg date (or today as default)
 * and return a new date by omitting time (hours and minutes will be zero)
 */
export const getNewDate = (date?: Date, withTime = false): Date => {
  const tempDate = date || new Date();

  if (withTime) {
    return new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
      tempDate.getHours(),
      tempDate.getMinutes()
    );
  }

  return new Date(
    tempDate.getFullYear(),
    tempDate.getMonth(),
    tempDate.getDate()
  );
};

export const getMonday = (date: Date): Date => {
  date = new Date(date);
  let day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  // Don't take hours into account
  const newD = new Date(date.setDate(diff));

  return getNewDate(newD);
  // return new Date(newD.getFullYear(), newD.getMonth(), newD.getDay());
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
export const getDisplayDate = (date: Date): String =>
  date.toLocaleString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

export const capitalize = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getNextXDayDate = (date: Date, offsetDays: number): Date => {
  let tomorrow = getNewDate(date);
  tomorrow.setDate(getNewDate(date).getDate() + offsetDays);

  return tomorrow;
};

export const isAfterNow = (date: Date) => {
  console.log('dare', date);
  if (!(date instanceof Date)) throw Error('You should provide a date object');

  const now = new Date();

  return date > now;
};
