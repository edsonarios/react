const Calendar = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDay()

    return (
        <div className='calendar'>
            <div className='calendar-header'>
                {month}
            </div>
            <div className='calendar-footer'>
                {day}
            </div>
        </div>
    );
};

export default Calendar;
