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
9. Create methode to set time on day-timepickers
*/

var totalPenHours;
var totalCurHours;

function pendShift(elementId) {
	shift = pharseShift(elementId);
	if (shift.valid) {
		addPendingShift(shift);
		totalPendingHours(shift);
	} else {
		removePendingShift(shift);
	}
}

function pharseShift(elementId) {
	var start = new Object();
	var end = new Object();
	var shift = new Object();

	parseStartAndEnd(elementId, start, end);
	shift.valid = ensureLinarity(start, end);
	shift.startHour = start.hour24;
	shift.endHour = end.hour24;
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
	if (start.corrected || end.corrected) {
		alert("Shifts work in 30 min increments. Your selected time will be rounded to the next 30 minute mark.");
		if (start.corrected) setTimePickerValue(start);
		if (end.corrected) setTimePickerValue(end);
	}
	if (start.hour24 >= 23 || end.hour24 <= 2) {
		alert("Please try to select more aviablity.")
	}
}

function setTimePickerValue(time) {
	alert(time.element + " set value to " + time.timeString);
	time.element.value = time.timeString;
}

function parseTimeToObj(time, linar) {
	time.linar = linar;
	time.type = time.elementArr[0];
	time.weekDay = time.elementArr[1];
	time.day = generateDay(time.weekDay);
	time.element = document.getElementById(time.elementId);
	time.timeString = time.element.value;
	time.amOrPm = (time.timeString.split(" ", 2))[1];
	time.time = (time.timeString.split(" ", 2))[0];
	time.hour = Number((time.time.split(":", 2))[0]);
	time.min = Number((time.time.split(":", 2))[1]);
	time.corrected = false;
	pharse24(time);
	correctMin(time);
}

function pharse24(time) {
	if (time.amOrPm == "pm" && time.hour < 12) {
		time.hour24 +=12;
	} else if (time.amOrPm == "am" && time.hour == 12) {
		if (time.linar == "start") {
			time.hour24 = 0;
		} else {
			time.hour24 = 24;
		}
	} else {
		time.hour24 = time.hour
	}
	parseTime24ToString(time);
}

function correctMin(time) {
	if (time.min != 0 && time.min != 30) {
		time.corrected = true;
		if (time.min < 30) {
			if (time.linar == "start" ) {
				time.min = 30;
			} else {
				time.min = 0;
			}
		} else {
			if (time.linar == "start" ) {
				hourUp(time);
				time.min = 0;
			} else {
				time.min = 30;
			}
		}
		parseTimeToString(time);
		parseTime24ToString(time);
	}
}

function hourUp(time){
	time.hour24++;
	time.hour++;
	if ((time.hour24 > 24) || (time.hour24 = 24 && time.min > 0)) {
		time.day++;
	}
	if (time.hour == 12) {
		if (time.amOrPm == "am") time.amOrPm = "pm";
		if (time.amOrPm == "pm") time.amOrPm = "am";
	} else if (time.hour == 13) {
		time.hour = 1;
	}
}

function parseTime24ToString(time) {
	time.min = (time.min < 10 ? '0' : '') + time.min;
	time.time24 = time.hour24 + ":" + time.min;
}

function parseTimeToString(time) {
	time.min = (time.min < 10 ? '0' : '') + time.min;
	time.timeString = time.hour + ":" + time.min + " " + time.amOrPm;
}

function ensureLinarity(start, end) {
	if ((start.hour24 > end.hour24) || (start.hour24 == end.hour24 && start.min > end.min)) {
		alert("ERR: Timetravel Required - The start of your shift must occur before the end.");
		return false;
	} else	if (start.hour24 == end.hour24 && start.min == end.min) {
		alert("ERR: Linarity - This day has no aviablity set on this day.")
		return false
	}
	return true;
}

function addPendingShift(shift) {
	var text = "Pending Changes";
	var id = shift.weekDay + "-pending";
	var color = "#C2185B";
	addShift(shift, text, id, color)
}

function removePendingShift(shift) {
	var id = shift.weekDay + "-pending";
	removeCalEvent(id);
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
  removeCalEvent(shiftEvent.id);
	addCalEvent(shiftEvent);
}

function addCalEvent(shiftEvent) {
    $('#calendar').fullCalendar( 'renderEvent', shiftEvent );
}

function removeCalEvent(id) {
	//return if any events were removed and if so how many hours (for totaling)
  $('#calendar').fullCalendar('removeEvents', id);
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
	totalCurHours = totalHours(totalCurHours, "Current: ", "def-hours-cur");
}

function totalPendingHours(shift) {
	totalPenHours = totalHours(shift, "Pending: ", "def-hours-pen");
}

function totalHours(shift, text, id) {
	//add code to get hours from all shifts that match the event id (pen or cur)
	//give warnings about requested hours
	var total = (shift.endHour - shift.startHour) + ((shift.endMin/60) - (shift.startMin/60));
	document.getElementById(id).innerHTML = text + total;
	return total;
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
