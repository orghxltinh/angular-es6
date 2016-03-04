const Component = angular.module("Component")
import userTpl from  "./user.tpl"
import userList from "./user-list.tpl"
import "./user-update"

Component.config([ "$stateProvider", ( $stateProvider ) => {

  $stateProvider
    .state("index.user", {
      url: "user",
      abstract: true,
      views: {
        "main-contaner@": {
          template: userTpl
        }
      }
    })
    .state("index.user.list", {
      url: "",
      views: {
        "user-view": {
          template: "<user-list></user-list>",
          controller: "userListCtrl"
        }
      }
    })
}]);

Component.component("userList",{
  template: userList,
  controller: "userListCtrl",
  controllerAs: "ctrl"
})

Component.controller("userListCtrl",[function(){
  var ctrl = this;
  ctrl.data = "this is user list view"
}])
