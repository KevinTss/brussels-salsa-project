import * as Yup from 'yup';

export const classeFormSchema = Yup.object().shape({
  baseSpots: Yup.number()
    .min(0, 'Minimum 0')
    .max(50, 'Maximum 50')
    .required('Required'),
  maxSpots: Yup.number()
    .min(2, 'Minimum 2')
    .max(100, 'Maximum 100')
    .required('Required'),
});
