import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prop-types
const CalendarComponent = ({ handleDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleDateSelect(date);
    };

    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default CalendarComponent;