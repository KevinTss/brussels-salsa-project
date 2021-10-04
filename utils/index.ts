export const capitalize = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const isAfterNow = (date: Date) => {
  console.log('dare', date);
  if (!(date instanceof Date)) throw Error('You should provide a date object');

  const now = new Date();

  return date > now;
};

export * from './dayjs';
