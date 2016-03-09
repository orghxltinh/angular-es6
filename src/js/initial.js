import indexTpl from "./index.tpl";
import "angular-ui-router"
import ngRedux from 'ng-redux';
import rootReducer from "./reducers";

console.log("=== initital app ===");
const MainApp = angular.module( "mainApp", [ ngRedux, "ui.router", "Model", "Helper", "Directive", "Component" ] )
const Component = angular.module("Component",[])
const Model = angular.module("Model",[])
const Helper = angular.module("Helper",[])
const Directive = angular.module("Directive",[])

MainApp.config([ "$ngReduxProvider", "$stateProvider", "$urlRouterProvider", "$locationProvider",
( $ngReduxProvider, $stateProvider, $urlRouterProvider, $locationProvider ) => {
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

    
    //implement redux store
    $ngReduxProvider.createStoreWith( rootReducer );
}]).run( () => {

});


MainApp.controller("indexCtrl",[function(){

}])
angular.element(document).ready( () => {
  angular.bootstrap($("body")[0],["mainApp"])
})
