const Component = angular.module("Component")
import userUpdateTpl from  "./user-update.tpl"

Component.config([ "$stateProvider", ( $stateProvider ) => {
  $stateProvider
    .state("index.user.update", {
      url: "/update",
      views: {
        "user-view": {
          template: "<user-detail />",
          controller: "userUpdateCtrl"
        }
      }
    })
}]);

Component.component("userDetail",{
  template: userUpdateTpl,
  controller: "userUpdateCtrl",
  controllerAs: "ctrl"
})

Component.controller("userUpdateCtrl",[function(){
  var ctrl = this;
  ctrl.data = "this is user update view"
}])
