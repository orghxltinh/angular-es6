import DirectiveCalendarTpl from "./directive-calendar.tpl"

const Directive = angular.module("Directive")

Directive.directive("fullCalendar",[ () => {
  var $selected = null;
  return {
    restrict: "E",
    scope: {},
    template: DirectiveCalendarTpl,
    link: ( scope, el, attrs ) => {
      console.log("loading calendar directive")
      var $el = $(el),
          $calendar = $el.find("> div");
          console.log("$calendar:",$calendar);
          $calendar.fullCalendar({
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },
            defaultView: "agendaWeek",
            defaultDate: '2016-01-12',
            slotEventOverlap: false,
            selectable: true,
            editable: true,
            eventLimit: true, // allow "more" link when too many events,
            selectOverlap: true,
            unselectAuto: false,
            select: function(start, end, jsEvent, view,resources) {
              // console.log("start:",start);
              // console.log("end:",end);
              // console.log("jsEvent:",jsEvent);
              // console.log("view:",view);
              var $el = $(".fc-highlight");
              $selected = $el.first();
              $selected.popover({
                container: ".fc-time-grid-container",
                html: true,
                placement: "top",
                content: "<div><div><strong>some content</strong></div><button>CREATE</button></div>",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div id="close">Close</div></div>'
              });

              $selected.popover("show");
              // $el.first().append("<div>this is append el</div>")
              // console.log($el.offset());
              var $popover = $(".popover");
              $popover.find("button").bind("click",function(){

                console.log("jsEvent:",jsEvent);
                $calendar.fullCalendar( "renderEvent", {
                  title: "this is new event",
                  start: start,
                  end: end
                });
              })
            },
            unselect: function(){
              console.log("unselected");
              $(".popover").remove();
              // if($selected !== null){
              //   $selected.popover('destroy');
              //   selected = null;
              // }
            },
            selectConstraint:{
              start: '00:00',
              end: '24:00',
              dow: [ 1, 2, 3, 4, 5 ]
            },
            eventDragStart: function(){
              console.log("eventDragStart:",arguments)
            },
            events: [
              {
                title: 'All Day Event',
                start: '2016-01-01'
              },
              {
                title: 'Long Event',
                start: '2016-01-07',
                end: '2016-01-10'
              },
              {
                id: 999,
                title: 'Repeating Event',
                start: '2016-01-09T16:00:00'
              },
              {
                id: 999,
                title: 'Repeating Event',
                start: '2016-01-16T16:00:00'
              },
              {
                title: 'Conference',
                start: '2016-01-11',
                end: '2016-01-13'
              },
              {
                title: 'Meeting',
                start: '2016-01-12T10:30:00',
                end: '2016-01-12T12:30:00'
              },
              {
                title: 'Lunch',
                start: '2016-01-12T12:00:00'
              },
              {
                title: 'Meeting',
                start: '2016-01-12T14:30:00'
              },
              {
                title: 'Happy Hour',
                start: '2016-01-12T17:30:00'
              },
              {
                title: 'Dinner',
                start: '2016-01-12T20:00:00'
              },
              {
                title: 'Birthday Party',
                start: '2016-01-13T07:00:00'
              },
              {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2016-01-28'
              }
            ]
          })
    }
  }
}])
