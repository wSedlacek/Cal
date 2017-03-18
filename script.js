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
	var day = elementArr[1];
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

	addCalEvent(startHour, startMin, endHour, endMin, day);
	totalHours(endHour - startHour);
}

function addCalEvent(startHour, startMin, endHour, endMin, day) {
    var newEvent = new Object();

    newEvent.title = "Pending Changes";
    newEvent.start = new Date();
    newEvent.end = new Date();
		var curWeekDay = (String(newEvent.end).split(" ", 2))[0];
		var curDay = Number((String(newEvent.end).split(" ", 4))[2]);
		alert(curWeekDay + " " + curDay);
		var startDay;

		switch (curWeekDay) {
			case "Mon":
				switch (day) {
					case "mon":
						startDay = curDay;
						break;
					case "tue":
						startDay = curDay + 1;
						break;
					case "wed":
						startDay = curDay + 2;
						break;
					case "thr":
						startDay = curDay + 3;
						break;
					case "fri":
						startDay = curDay + 4;
						break;
					case "sat":
						startDay = curDay + 5;
						break;
					case "sun":
						startDay = curDay + 6;
						break;
				}
			case "Tue":
				switch (day) {
					case "mon":
						startDay = curDay - 1;
						break;
					case "tue":
						startDay = curDay;
						break;
					case "wed":
						startDay = curDay + 1;
						break;
					case "thr":
						startDay = curDay + 2;
						break;
					case "fri":
						startDay = curDay + 3;
						break;
					case "sat":
						startDay = curDay + 4;
						break;
					case "sun":
						startDay = curDay + 5;
						break;
				}
			case "Wed":
				switch (day) {
					case "mon":
						startDay = curDay - 2;
						break;
					case "tue":
						startDay = curDay - 1;
						break;
					case "wed":
						startDay = curDay;
						break;
					case "thr":
						startDay = curDay + 1;
						break;
					case "fri":
						startDay = curDay + 2;
						break;
					case "sat":
						startDay = curDay + 3;
						break;
					case "sun":
						startDay = curDay + 4;
						break;
				}
			case "Thr":
				switch (day) {
					case "mon":
						startDay = curDay - 3;
						break;
					case "tue":
						startDay = curDay - 2;
						break;
					case "wed":
						startDay = curDay - 1;
						break;
					case "thr":
						startDay = curDay;
						break;
					case "fri":
						startDay = curDay + 1;
						break;
					case "sat":
						startDay = curDay + 2;
						break;
					case "sun":
						startDay = curDay + 3;
						break;
				}
			case "Fri":
				switch (day) {
					case "mon":
						startDay = curDay - 4;
						break;
					case "tue":
						startDay = curDay - 3;
						break;
					case "wed":
						startDay = curDay - 2;
						break;
					case "thr":
						startDay = curDay - 1;
						break;
					case "fri":
						startDay = curDay;
						break;
					case "sat":
						startDay = curDay + 1;
						break;
					case "sun":
						startDay = curDay + 2;
						break;
				}
			case "Sat":
				switch (day) {
					case "mon":
						startDay = curDay - 5;
						break;
					case "tue":
						startDay = curDay - 4;
						break;
					case "wed":
						startDay = curDay - 3;
						break;
					case "thr":
						startDay = curDay - 2;
						break;
					case "fri":
						startDay = curDay - 1;
						break;
					case "sat":
						startDay = curDay;
						break;
					case "sun":
						startDay = curDay + 1;
						break;
				}
			case "Sun":
				switch (day) {
					case "mon":
						startDay = curDay - 6;
						break;
					case "tue":
						startDay = curDay - 5;
						break;
					case "wed":
						startDay = curDay - 4;
						break;
					case "thr":
						startDay = curDay - 3;
						break;
					case "fri":
						startDay = curDay - 2;
						break;
					case "sat":
						startDay = curDay - 1;
						break;
					case "sun":
						startDay = curDay;
						break;
				}
		}
		newEvent.start.setDate(startDay);
		newEvent.end.setDate(startDay);
    newEvent.start.setHours(startHour,startMin,0,0);
    newEvent.end.setHours(endHour,endMin,0,0);
    newEvent.allDay = false;
    $('#calendar').fullCalendar('removeEvents') //Hide all events
    $('#calendar').fullCalendar( 'renderEvent', newEvent );
}


function totalHours(totalPen) {
	document.getElementById("def-hours-pen").innerHTML = "Pending: " + totalPen;
}
