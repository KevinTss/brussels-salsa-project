import { useFormik } from 'formik';

import { useClasses } from '../../../hooks';
import { Input } from '../../ui';

const CreateClassForm = () => {
  const { add } = useClasses();
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      frequency: 'weekly',
      spots: 10,
      time: '19:30',
      level: 'beginner',
      weekDay: 'monday',
    },
    onSubmit: (values) => {
      add(values);
    },
  });

  const [hour, min] = values.time.split(':');

  const handleTimeChange = ({ target: { name, value } }) => {
    let time = name === 'hour' ? `${value}:${min}` : `${hour}:${value}`;

    setFieldValue('time', time);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', width: '250px' }}
    >
      <label htmlFor='frequency'>Frequency</label>
      <select
        name='frequency'
        id='frequency'
        onChange={handleChange}
        disabled
        defaultValue={values.frequency}
      >
        {['weekly'].map((frequency) => (
          <option key={frequency} value={frequency}>
            {frequency}
          </option>
        ))}
      </select>
      <label htmlFor='spots'>Spots</label>
      <Input
        id='spots'
        name='spots'
        type='number'
        onChange={handleChange}
        value={values.spots}
      />
      <label htmlFor='level'>Level</label>
      <select
        name='level'
        id='level'
        onChange={handleChange}
        defaultValue={values.level}
      >
        {['beginner', 'improvers'].map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <label htmlFor='hour'>Time</label>
      <select
        name='hour'
        id='hour'
        onChange={handleTimeChange}
        defaultValue='19'
      >
        {[...Array(24).keys()].map((i) => {
          const val = i.toString().padStart(2, '0');

          return (
            <option key={i} value={val}>
              {val}
            </option>
          );
        })}
      </select>
      <select name='min' id='min' onChange={handleTimeChange} defaultValue='30'>
        {['00', '30'].map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <label htmlFor='weekDay'>Day of the week</label>
      <select
        name='weekDay'
        id='weekDay'
        onChange={handleChange}
        defaultValue={values.weekDay}
      >
        {['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default CreateClassForm;
