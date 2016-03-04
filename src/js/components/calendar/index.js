const Component = angular.module("Component")
import calendarTpl from  "./calendar.tpl"

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

Component.component("calendar",{
  template: calendarTpl,
  controller: "calendarCtrl"
})


Component.controller("calendarCtrl",[ function(){
  const cld = this;

  cld.text = "this is calendar";
}])
