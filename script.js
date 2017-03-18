//jquery
$(document).ready(function() {
	$.material.init()
});

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
		startHour = endHour + 1;
	}

	addCalEvent(startHour, startMin, endHour, endMin);
	totalHours(endHour - startHour);
}

function addCalEvent(startHour, startMin, endHour, endMin) {
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

function totalHours(totalPen) {
	document.getElementById("def-hours-pen").innerHTML = "Pending: " + totalPen;
}

//User Cookie
var user;

function checkUser() {
  user=getUser();
  if ( user == "" ) {
    user = createUser();
  }
}

function createUser() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqid = randLetter + Date.now();
  if(document.cookie != document.cookie) {
    index = document.cookie.indexOf(cookie_name);
  } else {
    index = -1;
  }
  if (index == -1) {
    document.cookie="user"+"="+uniqid+"; expires=Monday, 04-Apr-2099 05:00:00 GMT";
  }
  return uniqid;
}

function getUser() {
  var user_get = "";
  if(document.cookie) {
    index = document.cookie.indexOf("user");
    if (index != -1) {
      namestart = (document.cookie.indexOf("=", index) + 1);
      nameend = document.cookie.indexOf(";", index);
      if (nameend == -1) {
        nameend = document.cookie.length;
      }
      user_get = document.cookie.substring(namestart, nameend);
      return user_get;
    }
  }
  return ""
}
