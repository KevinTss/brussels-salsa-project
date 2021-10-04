export * from './constants';
export * from './dayjs';

export const capitalize = (string: string): string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getEventNameDisplay = (type: string, level: string): string =>
  `${capitalize(type)} ${level}s`;
