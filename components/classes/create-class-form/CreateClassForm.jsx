import { useFormik } from 'formik';

import { useClasses } from '../../../hooks';

const CreateClassForm = () => {
  const { add } = useClasses();
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      frequency: 'weekly',
      spots: 10,
      time: '19:30',
      level: 'beginner',
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
    <form onSubmit={handleSubmit}>
      <label htmlFor='frequency'>Frequency</label>
      <input
        id='frequency'
        name='frequency'
        type='text'
        onChange={handleChange}
        value={values.frequency}
      />
      <label htmlFor='spots'>Spots</label>
      <input
        id='spots'
        name='spots'
        type='spots'
        onChange={handleChange}
        value={values.spots}
      />
      <label htmlFor='level'>Level</label>
      <select name='level' id='level' onChange={handleChange}>
        {['beginner', 'improvers'].map((l) => (
          <option key={l} value={l} selected={values.level === l}>
            {l}
          </option>
        ))}
      </select>
      <label htmlFor='hour'>Time</label>
      <select name='hour' id='hour' onChange={handleTimeChange}>
        {[...Array(24).keys()].map((i) => {
          const val = i.toString().padStart(2, '0');

          return (
            <option key={i} value={val} selected={val === hour}>
              {val}
            </option>
          );
        })}
      </select>
      <select name='min' id='min' onChange={handleTimeChange}>
        {['00', '30'].map((i) => (
          <option key={i} value={i} selected={i === min}>
            {i}
          </option>
        ))}
      </select>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default CreateClassForm;
