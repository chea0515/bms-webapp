define(['app'], function(app) {
	app.register.controller('leftController',['$scope', '$http', function(scope, http) {
		scope.test_left_01 = "left测试成功！";
	}]);
});