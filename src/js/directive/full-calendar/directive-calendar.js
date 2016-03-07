import DirectiveCalendarTpl from "./directive-calendar.tpl"
import "./directive-calendar.scss"

console.log("moment:",moment())

const Directive = angular.module("Directive")

Directive.directive("fullCalendar",[ "$timeout", ($timeout) => {
  var $selected = null;
  return {
    restrict: "E",
    scope: {},
    template: DirectiveCalendarTpl,
    link: ( scope, el, attrs ) => {
      console.log("loading calendar directive")
      var $el = $(el),
          $calendar = $el.find("> div");

          $timeout( implementCalendar , 100 );

          function implementCalendar() {
            $calendar.fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
              },
              defaultView: "agendaWeek",
              defaultDate: '2016-03-07',
              slotEventOverlap: false,
              selectable: true,
              editable: true,
              eventLimit: true, // allow "more" link when too many events,
              selectOverlap: true,
              unselectAuto: false,
              select: function(start, end, jsEvent, view,resources) {

                var $el = $(".fc-highlight");
                $selected = $el.first();
                $selected.popover({
                  container: ".fc-time-grid-container",
                  html: true,
                  placement: "top",
                  content: '<div class="panel panel-success"><div class="panel-heading"><h3 class="panel-title">Create new Event</h3></div><div class="panel-body"><input class="create-event-input " type="text" placeholder="Event Title" /></div><div class="panel-footer"><button class="create btn btn-default">CREATE</button></div></div>',
                  template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div id="close" class="btn btn-default btn-xs"><span class="glyphicon glyphicon glyphicon-remove"></span></div></div>'
                });

                $selected.popover("show");

                var $popover = $(".popover");
                $popover.find("button").bind( "click", () => {
                  let title = $popover.find(".create-event-input").val()
                  $calendar.fullCalendar( "renderEvent", {
                    title,
                    start: start,
                    end: end
                  });
                  $calendar.fullCalendar("unselect")
                })

                $popover.find("#close").bind( "click", () => {
                  $calendar.fullCalendar("unselect")
                })
              },

              //unselected
              unselect: function(){
                $el.find(".popover").remove();

              },
              selectConstraint:{
                start: '00:00',
                end: '24:00',
                dow: [ 1, 2, 3, 4, 5 ]
              },
              events: [
                {
                  title: 'All Day Event',
                  start: '2016-03-01'
                },
                {
                  title: 'Long Event',
                  start: '2016-03-07',
                  end: '2016-03-10'
                },
                {
                  id: 999,
                  title: 'Repeating Event',
                  start: '2016-03-09T16:00:00'
                },
                {
                  id: 999,
                  title: 'Repeating Event',
                  start: '2016-03-16T16:00:00'
                },
                {
                  title: 'Conference',
                  start: '2016-03-11',
                  end: '2016-03-13'
                },
                {
                  title: 'Meeting',
                  start: '2016-03-12T10:30:00',
                  end: '2016-03-12T12:30:00'
                },
                {
                  title: 'Lunch',
                  start: '2016-03-12T12:00:00'
                },
                {
                  title: 'Meeting',
                  start: '2016-03-12T14:30:00'
                },
                {
                  title: 'Happy Hour',
                  start: '2016-03-12T17:30:00'
                },
                {
                  title: 'Dinner',
                  start: '2016-03-12T20:00:00'
                },
                {
                  title: 'Birthday Party',
                  start: '2016-03-13T07:00:00'
                },
                {
                  title: 'Click for Google',
                  url: 'http://google.com/',
                  start: '2016-03-28'
                }
              ]
            })
          }


    }
  }
}])
