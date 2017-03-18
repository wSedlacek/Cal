var weekdays = [
  { name:"Monday",    abv:"Mon", id:"mon" },
  { name:"Tuesday",   abv:"Tue", id:"tue" },
  { name:"Wednesday", abv:"Wed", id:"wed" },
  { name:"Thrusday",  abv:"Thr", id:"thr" },
  { name:"Friday",    abv:"Fri", id:"fri" },
  { name:"Saturday",  abv:"Sat", id:"sat" },
  { name:"Sunday",    abv:"Sun", id:"sun" },
];

var temp = document.querySelector('#timepicker-temp');
for (var i = 0; i < weekdays.length; i++) {
  var day = weekdays[i];
  var clone = temp.content.cloneNode(true);
  var h3 = clone.querySelectorAll('h3');
  h3[0].innerHTML= day.abv;
  var input = clone.querySelectorAll('input');
  input[0].id = "time-"+day.id+"-start";
  input[1].id = "time-"+day.id+"-end";
  temp.parentNode.appendChild(clone);
}
