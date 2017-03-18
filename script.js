//Todo:
/*
1. Buttons to clear days
2. Button to Submit schedule
3. SQL database to load and submit Schedule
4. Fix the calendar making schedule disappear when switching weeks.
5. Make default scheduled recurrening weekly on calendar.
6. Make totals add up all the times on calendar.
7. Override buttons for certain days
8. Use cookies to save templates of default schedule and override schedules
*/

function pendShift(elementId) {
	shift = pharseShift(elementId);
	addPendingShift(shift);
	totalPendingHours(shift.endHour - shift.startHour);
}

function pharseShift(elementId) {
	var elementArr = elementId.split("-",3);
	var elementStartId;
	var elementStartArr;
	var elementEndId;
	var elementEndArr;

	var type = elementArr[0];
	var weekDay = elementArr[1];
	var startOrEnd = elementArr[2];

	if (startOrEnd == "end" ) {
		elementStartId = elementArr[0] + "-" + elementArr[1] + "-start";
		elementStartArr = elementStartId.split("-",3);
		elementEndId = elementId;
		elementEndArr = elementArr;
	} else {
		elementStartId = elementId;
		elementStartArr = elementArr;
		elementEndId = elementArr[0] + "-" + elementArr[1] + "-end";
		elementEndArr = elementEndId.split("-",3);
	}

	var startTime = (document.getElementById(elementStartId)).value;
	var endTime = (document.getElementById(elementEndId)).value;

	var startAmOrPm = (startTime.split(" ", 2))[1];
	startTime = (startTime.split(" ", 2))[0];
	var startHour = Number((startTime.split(":", 2))[0]);
	var startMin = Number((startTime.split(":", 2))[1]);
	if (startAmOrPm == "pm" && startHour < 12) {
		startHour +=12;
		startTime = startHour + ":" + startMin
	} else if (startAmOrPm == "am" && startHour == 12) {
		startHour = 0;
	}

	var endAmOrPm = (endTime.split(" ", 2))[1];
	endTime = (endTime.split(" ", 2))[0];
	var endHour = Number((endTime.split(":", 2))[0]);
	var endMin = Number((endTime.split(":", 2))[1]);
	if (endAmOrPm == "pm" && endHour < 12) {
		endHour +=12;
		endTime = endHour + ":" + endMin
	} else if (endAmOrPm == "am" && endHour == 12) {
		endHour = 24;
	}

	if (startHour > endHour) {
		endHour = startHour + 2;
	}

	var curDate = new Date();
	var curDay = Number((String(curDate).split(" ", 4))[2]);
	var curWeekDay = (String(curDate).split(" ", 2))[0];
	var day =  generateStartDay(curDay, curWeekDay, weekDay);

	var shift = new Object();
	shift.startHour = startHour;
	shift.endHour = endHour;
	shift.startMin = startMin;
	shift.endMin = endMin;
	shift.weekDay = weekDay;
	shift.day = day;
	shift.type = type;

	return shift;
}

function addPendingShift(shift) {
	var shiftEvent = new Object();

	shiftEvent.title = "Pending Changes";
	shiftEvent.id = shift.weekDay + "-pending";
	shiftEvent.start = new Date();
	shiftEvent.end = new Date();
	shiftEvent.start.setDate(shift.day);
	shiftEvent.end.setDate(shift.day);
	shiftEvent.start.setHours(shift.startHour,shift.startMin,0,0);
	shiftEvent.end.setHours(shift.endHour,shift.endMin,0,0);
	shiftEvent.allDay = false;
	shiftEvent.color = "#C2185B"
	addCalEvent(shiftEvent);
}


function addCalEvent(shiftEvent) {
    $('#calendar').fullCalendar('removeEvents', shiftEvent.id);
    $('#calendar').fullCalendar( 'renderEvent', shiftEvent );
}

function generateStartDay(curDay, curWeekDay, shiftWeekDay) {
	var shiftDay;
	switch (curWeekDay) {
		case "Mon":
			switch (shiftWeekDay) {
				case "mon":
					shiftDay = curDay;
					break;
				case "tue":
					shiftDay = curDay + 1;
					break;
				case "wed":
					shiftDay = curDay + 2;
					break;
				case "thr":
					shiftDay = curDay + 3;
					break;
				case "fri":
					shiftDay = curDay + 4;
					break;
				case "sat":
					shiftDay = curDay + 5;shiftDay
			} break;
		case "Tue":
			switch (shiftWeekDay) {
				case "mon":
					shiftDay = curDay - 1;
					break;
				case "tue":
					shiftDay = curDay;
					break;
				case "wed":
					shiftDay = curDay + 1;
					break;
				case "thr":
					shiftDay = curDay + 2;
					break;
				case "fri":
					shiftDay = curDay + 3;
					break;
				case "sat":
					shiftDay = curDay + 4;
					break;
				case "sun":
					shiftDay = curDay + 5;
					break;
			} break;
		case "Wed":
			switch (shiftWeekDay) {
				case "mon":
					shiftDay = curDay - 2;
					break;
				case "tue":
					shiftDay = curDay - 1;
					break;
				case "wed":
					shiftDay = curDay;
					break;
				case "thr":
					shiftDay = curDay + 1;
					break;
				case "fri":
					shiftDay = curDay + 2;
					break;
				case "sat":
					shiftDay = curDay + 3;
					break;
				case "sun":
					shiftDay = curDay + 4;
					break;
			} break;
		case "Thr":
			switch (shiftWeekDay) {
				case "mon":
					shiftDay = curDay - 3;
					break;
				case "tue":
					shiftDay = curDay - 2;
					break;
				case "wed":
					shiftDay = curDay - 1;
					break;
				case "thr":
					shiftDay = curDay;
					break;
				case "fri":
					shiftDay = curDay + 1;
					break;
				case "sat":
					shiftDay = curDay + 2;
					break;
				case "sun":
					shiftDay = curDay + 3;
					break;
			} break;
		case "Fri":
			switch (shiftWeekDay) {
				case "mon":
					shiftDay = curDay - 4;
					break;
				case "tue":
					shiftDay = curDay - 3;
					break;
				case "wed":
					shiftDay = curDay - 2;
					break;
				case "thr":
					shiftDay = curDay - 1;
					break;
				case "fri":
					shiftDay = curDay;
					break;
				case "sat":
					shiftDay = curDay + 1;
					break;
				case "sun":
					shiftDay = curDay + 2;
					break;
			} break;
		case "Sat":
			switch (shiftWeekDay) {
				case "mon":
					shiftDay = curDay - 5;
					break;
				case "tue":
					shiftDay = curDay - 4;
					break;
				case "wed":
					shiftDay = curDay - 3;
					break;
				case "thr":
					shiftDay = curDay - 2;
					break;
				case "fri":
					shiftDay = curDay - 1;
					break;
				case "sat":
					shiftDay = curDay;
					break;
				case "sun":
					shiftDay = curDay + 1;
					break;
			} break;
		case "Sun":
			switch (shiftWeekDay) {
				case "mon":
					shiftDay = curDay - 6;
					break;
				case "tue":
					shiftDay = curDay - 5;
					break;
				case "wed":
					shiftDay = curDay - 4;
					break;
				case "thr":
					shiftDay = curDay - 3;
					break;
				case "fri":
					shiftDay = curDay - 2;
					break;
				case "sat":
					shiftDay = curDay - 1;
					break;
				case "sun":
					shiftDay = curDay;
					break;
			} break;
	}
	return shiftDay;
}

function totalCurrentHours(totalPen) {
	document.getElementById("def-hours-cur").innerHTML = "Current: " + totalPen;
}

function totalPendingHours(totalPen) {
	document.getElementById("def-hours-pen").innerHTML = "Pending: " + totalPen;
}

function showHideOvr(weekDayOvr) {
	var enabled = document.getElementById("chk-"+ weekDayOvr).checked;
	var ovrday = document.getElementById("ovr-" + weekDayOvr);
	if (enabled) {
		ovrday.style.display = "block";
	} else {
		ovrday.style.display = "none";
	}
}
