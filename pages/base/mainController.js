define(['app'], function(app) {
	app.register.controller('mainController',['$scope', '$http', function(scope, http) {
		scope.stest01 = "mian测试成功！";
	}]);
});