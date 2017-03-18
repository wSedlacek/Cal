export function addCalEvent(startHour, startMin, endHour, endMin) {
    var newEvent = new Object();

    newEvent.title = "Pending Changes";
    newEvent.start = new Date();
    newEvent.end = new Date();
    newEvent.start.setHours(startHour,startMin,0,0);
    newEvent.end.setHours(endHour,endMin,0,0);
    newEvent.allDay = false;
    $('#calendar').fullCalendar('removeEvents') //Hide all events
    $('#calendar').fullCalendar( 'renderEvent', newEvent );
}
