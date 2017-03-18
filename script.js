function pendHours(elementId) {
	var elementArr = elementId.split("-",3);
	var elementStartId;
	var elementStartArr;
	var elementEndId;
	var elementEndArr;
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
	var shiftWeekDay = elementArr[1];
	var startTime = (document.getElementById(elementStartId)).value;
	var endTime = (document.getElementById(elementEndId)).value;

	var startAmOrPm = (startTime.split(" ", 2))[1];
	startTime = (startTime.split(" ", 2))[0];
	var startHour = Number((startTime.split(":", 2))[0]);
	var startMin = Number((startTime.split(":", 2))[1]);
	if (startAmOrPm == "pm" && startHour < 12) {
		startHour +=12;
		startTime = startHour + ":" + startMin
	}

	var endAmOrPm = (endTime.split(" ", 2))[1];
	endTime = (endTime.split(" ", 2))[0];
	var endHour = Number((endTime.split(":", 2))[0]);
	var endMin = Number((endTime.split(":", 2))[1]);
	if (endAmOrPm == "pm" && endHour < 12) {
		endHour +=12;
		endTime = endHour + ":" + endMin
	}

	if (startHour > endHour) {
		endHour = startHour + 1;
	}

	addCalEvent(startHour, startMin, endHour, endMin, shiftWeekDay);
	totalHours(endHour - startHour);
}

function addCalEvent(startHour, startMin, endHour, endMin, shiftWeekDay) {
    var shift = new Object();

    shift.title = "Pending Changes";
    shift.start = new Date();
    shift.end = new Date();
		var curDay = Number((String(shift.end).split(" ", 4))[2]);
		var curWeekDay = (String(shift.end).split(" ", 2))[0];
		shift.day = generateStartDay(curDay, curWeekDay, shiftWeekDay);
		shift.start.setDate(shift.day);
		shift.end.setDate(shift.day);
    shift.start.setHours(startHour,startMin,0,0);
    shift.end.setHours(endHour,endMin,0,0);
    shift.allDay = false;
    $('#calendar').fullCalendar('removeEvents') //Hide all events
    $('#calendar').fullCalendar( 'renderEvent', shift );
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


function totalHours(totalPen) {
	document.getElementById("def-hours-pen").innerHTML = "Pending: " + totalPen;
}
