import React from 'react';
import moment from "moment";

const DateFormatter = ({date}) => {
    const today = moment();
    const targetDate = moment(date);
    const formattedDate = targetDate.format('dddd, MMMM D, YYYY');

    const isToday = targetDate.isSame(today, 'day');
    const isYesterday = targetDate.isSame(today.clone().subtract(1, 'day'), 'day');

    let displayText = formattedDate;

    if (isToday) {
        displayText = `Today - ${formattedDate}`;
    } else if (isYesterday) {
        displayText = `Yesterday - ${formattedDate}`;
    }

    return <div>{displayText}</div>;
};

export default DateFormatter;

