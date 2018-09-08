define(['app'], function(app) {
	app.register.controller('homeController', ['$scope', function(scope) {
		scope.test_home_01 = "成功进入home页面！";
	}]);
});