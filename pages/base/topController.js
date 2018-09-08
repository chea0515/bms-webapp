define(['app'], function(app) {
	app.register.controller('topController', ['$scope', '$http', function(scope, http) {
		scope.stest01 = "top测试成功！";
	}]);
});