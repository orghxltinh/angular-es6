import calendarTpl from  "./calendar.tpl"



class CalendarCtrl{
  constructor(){
    console.log("this is constructor");
  }
}

export default {
  template: calendarTpl,
  controller: CalendarCtrl
}
