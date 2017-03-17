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
	$('#time-mon-start').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  $("#time-mon-start").change(function(){
    
  });
	$('#time-mon-end').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  //Tue
	$('#time-tue-start').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  $("#time-tue-start").change(function(){
    
  });
	$('#time-tue-end').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  //Wed
	$('#time-wed-start').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  $("#time-wed-start").change(function(){
    
  });
	$('#time-wed-end').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  //Thr
	$('#time-thr-start').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  $("#time-thr-start").change(function(){
    
  });
	$('#time-thr-end').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  //Fri
	$('#time-fri-start').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  $("#time-fri-start").change(function(){
    
  });
	$('#time-fri-end').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  //Sat
	$('#time-sat-start').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  $("#time-sat-start").change(function(){
    
  });
	$('#time-sat-end').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  //Sun
	$('#time-sun-start').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  $("#time-sun-start").change(function(){
    
  });
	$('#time-sun-end').bootstrapMaterialDatePicker
  ({
	  date: false,
	  shortTime: true,
	  format: 'h:mm a'
  });
  
  $.material.init()
});

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
