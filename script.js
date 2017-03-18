//jquery
$(document).ready(function() {

  //Full Calendar
	$('#calendar').fullCalendar({
		editable: false,
		handleWindowResize: true,
		defaultView: 'agendaWeek',
		displayEventTime: false,
		allDaySlot: false,
		firstDay: 1
	});

  //Time Picker
  //Mon
	$('#time-mon-start').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	$('#time-mon-end').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	//Tue
	$('#time-tue-start').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	$('#time-tue-end').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	//Wed
	$('#time-wed-start').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	$('#time-wed-end').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	//Thr
	$('#time-thr-start').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	$('#time-thr-end').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	//Fri
	$('#time-fri-start').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	$('#time-fri-end').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	//Sat
	$('#time-sat-start').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	$('#time-sat-end').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	//Sun
	$('#time-sun-start').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});
	$('#time-sun-end').bootstrapMaterialDatePicker ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
	});

	$('input.timepicker').change(function(){
		var thisId = jQuery(this).attr("id");
    addEventTest(thisId);
	});

	$.material.init()
});

function addEventTest(elementId) {
	var elementArr = elementId.split("-",3);
	var elementStartId;
	var elementStartArr;
	var elementEndId;
	var elementEndArr;
	alert(elementArr[0]);
	alert(elementArr[1]);
	alert(elementArr[2]);
	var startOrEnd = elementArr[2];
	if (startOrEnd == "end" ) {
		alert(elementArr[1] + "-" + day + "-start")
		elementStartId = elementArr[1] + "-" + day + "-start";
		elementStartArr = elementStartId.split("-",3);
		elementEndId = elementId;
		elementEndArr = elementArr;
	} else {
		elementStartId = elementId;
		elementStartArr = elementArr;
		alert(elementArr[1] + "-" + day + "-end")
		elementEndId = elementArr[1] + "-" + day + "-end";
		elementEndArr = elementEndId.split("-",3);
	}
	var day = elementArr[1];
	alert(elementStartId)
	alert(elementEndId)
	var startTime = (document.getElementById(elementStartId)).value;
	var endTime = (document.getElementById(elementEndId)).value;

	alert(startTime + " - " + endTime);
}

function addEvent() {
    var startdrop = document.getElementById("#time-mon-start");
    var starthour = Number();

    var enddrop = document.getElementById("#time-mon-end");
    var endhour = Number();

    if (starthour > endhour) {
      console.log(starthour + " " + endhour);
      endhour = starthour + 1;
      enddrop.value = endhour;
    }

    var total = endhour - starthour;
    document.getElementById("totalhours").innerHTML = "Total: " + total;

    var newEvent = new Object();

    newEvent.title = "Avilable hours";
    newEvent.start = new Date();
    newEvent.end = new Date();
    newEvent.start.setHours(starthour,0,0,0);
    newEvent.end.setHours(endhour,0,0,0);
    newEvent.allDay = false;
    $('#calendar').fullCalendar('removeEvents') //Hide all events
    $('#calendar').fullCalendar( 'renderEvent', newEvent );
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
