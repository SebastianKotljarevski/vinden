import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = () => {
    const [startDate, setStartDate] = useState(
        
    );
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            excludeTimes={[
                setHours(setMinutes(new Date(), 0), 22),
                setHours(setMinutes(new Date(), 30), 22),
                setHours(setMinutes(new Date(), 0), 23),
                setHours(setMinutes(new Date(), 30), 23),
                setHours(setMinutes(new Date(), 0), 24),
                setHours(setMinutes(new Date(), 30), 24),
                setHours(setMinutes(new Date(), 0), 1),
                setHours(setMinutes(new Date(), 30), 1),
                setHours(setMinutes(new Date(), 0), 2),
                setHours(setMinutes(new Date(), 30), 2),
                setHours(setMinutes(new Date(), 0), 3),
                setHours(setMinutes(new Date(), 30), 3),
                setHours(setMinutes(new Date(), 0), 4),
                setHours(setMinutes(new Date(), 30), 4),
                setHours(setMinutes(new Date(), 0), 5),
                setHours(setMinutes(new Date(), 30), 5),
                setHours(setMinutes(new Date(), 0), 6),
                setHours(setMinutes(new Date(), 30), 6),
                setHours(setMinutes(new Date(), 0), 7),
                setHours(setMinutes(new Date(), 30), 7),
            ]}
            dateFormat="MMMM d, yyyy h:mm aa"
        />
    );
};

export default DateTimePicker;