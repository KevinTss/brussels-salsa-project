type Classe = {
  day: string;
};

export const getDayClasses = (classes: Classe[], weekDay: string): Classe[] =>
  classes.filter(({ day }) => day === weekDay.toUpperCase());

