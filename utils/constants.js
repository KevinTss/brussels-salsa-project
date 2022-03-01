export const BREAKPOINT = {
  XL: '1280px',
  L: '1024px',
  M: '768px',
  S: '498px',
};

export const MEDIA_QUERY = {
  DESKTOP: `@media only screen and (min-width: ${BREAKPOINT.XL})`,
  SMALL_DESKTOP_AND_DOWN: `@media only screen and (max-width: ${BREAKPOINT.XL})`,
  TABLET_AND_DOWN: `@media only screen and (max-width: ${BREAKPOINT.M})`,
  MOBILE_AND_DOWN: `@media only screen and (max-width: ${BREAKPOINT.S})`,
};

export const CALENDAR_VIEW = {
  DAY: 'DAY',
  WEEK: 'WEEK',
};
