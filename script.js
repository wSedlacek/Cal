//Todo:
/*
1. Buttons to clear days (Logic)
2. Button to Submit schedule (Logic)
3. SQL database to load and submit Schedule
4. Fix the calendar making schedule disappear when switching weeks.
5. Make default scheduled recurrening weekly on calendar.
6. Make totals add up all the times on calendar.
7. Override buttons for certain days. (Back end logic)
8. Use cookies to save templates of default schedule and override schedules
*/

var totalPenHours;
var totalCurHours;

function pendShift(elementId) {
	shift = pharseShift(elementId);
	addPendingShift(shift);
	totalPendingHours(shift);
}

function pharseShift(elementId) {
	var start = new Object();
	var end = new Object();

	parseStartAndEnd(elementId, start, end);
	ensureLinarity(start, end, 2);

	var shift = new Object();
	shift.startHour = start.hour;
	shift.endHour = end.hour;
	shift.startMin = start.min;
	shift.endMin = end.min;
	shift.weekDay = start.weekDay;
	shift.day = start.day;
	shift.type = start.type;

	return shift;
}

function parseStartAndEnd(elementId, start, end) {
	var element = new Object();
	element.id = elementId;
	element.arr = element.id.split("-",3);
	element.linar = element.arr[2];
	if (element.linar == "end" ) {
		start.elementId = element.arr[0] + "-" + element.arr[1] + "-start";
		start.elementArr = start.elementId.split("-",3);
		end.elementId = element.id;
		end.elementArr = element.arr;
	} else {
		start.elementId = element.id;
		start.elementArr = element.arr;
		end.elementId = element.arr[0] + "-" + element.arr[1] + "-end";
		end.elementArr = end.elementId.split("-",3);
	}

	parseTimeToObj(start, "start");
	parseTimeToObj(end, "end");
}

function parseTimeToObj(time, linar) {
	time.linar = linar;
	time.type = time.elementArr[0];
	time.weekDay = time.elementArr[1];
	time.day = generateDay(time.weekDay);
	time.time = (document.getElementById(time.elementId)).value;
	time.amOrPm = (time.time.split(" ", 2))[1];
	time.time = (time.time.split(" ", 2))[0];
	time.hour = Number((time.time.split(":", 2))[0]);
	time.min = Number((time.time.split(":", 2))[1]);
	convertTo24(time);
	correctMin(time);
}

function convertTo24(time) {
	if (time.amOrPm == "pm" && time.hour < 12) {
		time.hour +=12;
	} else if (time.amOrPm == "am" && time.hour == 12) {
		if (time.linar == "start") {
			time.hour = 0;
		} else {
			time.hour = 24;
		}
	}
	time.time = parseTimeToString(time.hour, time.min);
}

function correctMin(time) {
	if (time.min != 0 && time.min != 30) {
		alert("Shifts work in 30 min increments. Your selected time will be rounded to the next 30 minute mark.");
		if (time.min < 30) {
			time.min = 30;
		} else {
			time.hour++;
			time.min = 0;
		}
	}
}

function parseTimeToString(hour, min) {
	return hour + ":" + min;
}

function ensureLinarity(start, end, hoursToAdd) {
	if (start.hour > end.hour) {
		end.hour = start.hour + hoursToAdd;
	}
}

function addPendingShift(shift) {
	var text = "Pending Changes";
	var id = shift.weekDay + "-pending";
	var color = "#C2185B";
	addShift(shift, text, id, color)
}

function addShift(shfit, text, id, color) {
	var shiftEvent = new Object();

	shiftEvent.title = text;
	shiftEvent.id = id;
	shiftEvent.start = new Date();
	shiftEvent.end = new Date();
	shiftEvent.start.setDate(shift.day);
	shiftEvent.end.setDate(shift.day);
	shiftEvent.start.setHours(shift.startHour,shift.startMin,0,0);
	shiftEvent.end.setHours(shift.endHour,shift.endMin,0,0);
	shiftEvent.allDay = false;
	shiftEvent.color = color;
	addCalEvent(shiftEvent);
}

function addCalEvent(shiftEvent) {
		//return if any events were removed and if so how many hours (for totaling)
    $('#calendar').fullCalendar('removeEvents', shiftEvent.id);
    $('#calendar').fullCalendar( 'renderEvent', shiftEvent );
}

function generateDay(shiftWeekDay) {
	var curDate = new Date();
	var curDay = Number((String(curDate).split(" ", 4))[2]);
	var curWeekDay = (String(curDate).split(" ", 2))[0];
	var shiftDay;
	//This switch probably need to be simplified
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
					shiftDay = curDay + 5;
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

function totalCurrentHours(shift) {
	totalCurHours = shift.endHour - shift.startHour;
	//add code to get hours from all shifts that match the event id (pen or cur)
	totalHours(totalCurHours, "Current: ", "def-hours-cur");
}

function totalPendingHours(totalPen) {
	totalPenHours = shift.endHour - shift.startHour;
	//add code to get hours from all shifts that match the event id (pen or cur)
	//give warnings about requested hours
	totalHours(totalPenHours, "Pending: ", "def-hours-pen");
}

function totalHours(total, text, id) {
	document.getElementById(id).innerHTML = text + total;
}

function clearTime(id) {
	//Add code to clear out the boxes that match the id.
	alert(id+" wants to be cleared!");
}

function showHideOvr(weekDayOvr) {
	//Fix alignment to center like the def
	var enabled = document.getElementById("chk-"+ weekDayOvr).checked;
	var ovrday = document.getElementById("ovr-" + weekDayOvr);
	if (enabled) {
		ovrday.style.display = "inline";
	} else {
		ovrday.style.display = "none";
	}
}
