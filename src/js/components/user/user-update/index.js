const Component = angular.module("Component")
import userUpdateTpl from  "./user-update.tpl"

Component.config([ "$stateProvider", ( $stateProvider ) => {
  $stateProvider
    .state("index.user.update", {
      url: "/update",
      views: {
        "user-view": {
          template: userUpdateTpl,
          controller: "userUpdateCtrl"
        }
      }
    })
}]);

Component.controller("userUpdateCtrl",[function(){

}])
