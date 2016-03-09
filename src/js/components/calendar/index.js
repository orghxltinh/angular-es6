const Component = angular.module("Component")
import calendarTpl from  "./calendar.tpl"

import * as CalendarAction from "../../actions/action.calendar"

Component.config([ "$stateProvider", "$urlRouterProvider", ( $stateProvider, $urlRouterProvider ) => {

  $stateProvider
    .state("index.calendar", {
      url: "calendar",
      views: {
        "main-contaner@": {
          // template: calendarTpl
          template: "<calendar></calendar>"
        }
      }

    })
}]);

// Component.component("calendar",{
//   template: calendarTpl,
//   controller: "calendarCtrl"
// })

Component.directive("calendar", calendar )


class CalendarCtrl {
  constructor($ngRedux,$scope){
    console.log("---- ----- -----");
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, CalendarAction)(this);
    $scope.$on('$destroy', unsubscribe);
    console.log("this:",this);
    this.fetchData();
  }

  mapStateToThis(state) {
    console.log("state:",state);
    return {
      value: state.calendar
    };
  }
}

function calendar(){
  return {
    template: calendarTpl,
    controller: CalendarCtrl
  }
}

// Component.controller("calendarCtrl",[ function(){
//   const cld = this;
//   console.log("dsfdsfd dsf ds fds");
//   cld.text = "this is calendar";
// }])
