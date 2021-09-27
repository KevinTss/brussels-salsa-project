import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerUI = props => {
  // const [startDate, setStartDate] = useState(new Date());
  return <DatePicker {...props} />
}

export default DatePickerUI
