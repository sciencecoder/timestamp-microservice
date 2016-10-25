'use strict'

var monthArr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
//Tests for date that includes month and year
var reg1 = /[a-zA-Z]+([^a-zA-Z0-9]+)?[0-9]+/g;
//Tests for date that includes day, month, and year
var reg2 = /[a-zA-Z]+((\W|_)+)?[0-9]+(\W|_)+[0-9]+/g;
var obj = {
    unix: null,
    natural: null
};
var unixDate;
var monthName;
var dateArr;
const dateArr_year_index = 0;
const dateArr_month_index = 1;
const dateArr_day_index = 2;  
module.exports  = function(data) {
  
  if(reg2.test(data) || reg1.test(data)) {
    dateArr = data.match(/([a-zA-Z]+)|([0-9]+)/g);
    //change format from MM:DD:YY to YY:MM:DD
    const year = dateArr.pop();
    dateArr.unshift(year);
    //save reference to month name
    monthName = dateArr[dateArr_month_index];
    
    if(typeof dateArr[dateArr_month_index] == 'string') {
      //convert month name to number to be compatible with date Object
      dateArr[dateArr_month_index] = monthArr.indexOf(monthName) + 1;
  
    } else {
      //save reference to month name
      var monthIndex = dateArr[dateArr_month_index]-1;
      monthName = monthArr[monthIndex];
    }
     
    for(var i = 1; i < dateArr.length; i++) {
    
      //prefix day/month number with zero
      var prefixed = '0' + dateArr[i];
      //make day/month number two chars long
      dateArr[i] = prefixed.substr(prefixed.length-2, 2);
    }
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    unixDate = new Date(dateArr.join('-')).getTime();
    obj.unix = isNaN(unixDate) ? null : unixDate / 1000;
    obj.natural = obj.unix != null ? monthName + ' ' + (dateArr[dateArr_day_index] || '1') + ', ' + dateArr[dateArr_year_index] : null;
  
  } else if(data.match(/[0-9]+/g)[0] === data) {
    var date = new Date(parseInt(data, 10) * 1000);
    let year = date.getFullYear();
    let month = monthArr[date.getMonth()];
    let day = date.getDate();
    obj.unix = date.getTime();
    obj.natural = isNaN(obj.unix) ? null : month + ' ' + day + ', ' + year;
    console.log(obj.unix);
  }
 
  return JSON.stringify(obj);
};