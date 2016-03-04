import indexTpl from "./index.tpl"

console.log("=== initital app ===");
const MainApp = angular.module("mainApp",["ui.router","Model","Helper","Directive","Component"])
const Component = angular.module("Component",[])
const Model = angular.module("Model",[])
const Helper = angular.module("Helper",[])
const Directive = angular.module("Directive",[])

MainApp.config([ "$stateProvider", "$urlRouterProvider", "$locationProvider",
( $stateProvider, $urlRouterProvider, $locationProvider ) => {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("index", {
      url: "/",
      views: {
        "main-contaner": {
          template: indexTpl,
          controller: "indexCtrl",
          controllerAs: "index"
        }
      }
    })
    .state("index.home", {
      url: "home",
      views: {
        "main-contaner@": {
          template: indexTpl,
          controller: "indexCtrl",
          controllerAs: "index"
        }
      }
    })

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]).run( () => {

});

/*
  this controller is out of the management of ui-router
*/
MainApp.controller("mainCtrl",[function(){

}])

MainApp.controller("indexCtrl",[function(){

}])
angular.element(document).ready( () => {
  angular.bootstrap($("body")[0],["mainApp"])
})
