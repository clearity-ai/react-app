const getMonthName = (monthIndex) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
};

const getShortDayName = (dayIndex) => {
    const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    return dayNames[dayIndex];
};

export const getCurrentDate = () => {
    const date = new Date();
    const dayName = getShortDayName(date.getDay());
    const dayNumber = date.getDate();
    const monthName = getMonthName(date.getMonth());
    return `${dayName}, ${dayNumber} ${monthName}`;
};