define(['app'], function(app) {
	app.register.controller('leftController',['$scope', '$state', function(scope, state) {
		
		// menu
		scope.menus = null;
		$.ccGet(basePath + 'config/menu.json', function(d) {
			if(d && d.root) {
				scope.menus = d.root;
			}
		});
		
		//
		scope.menuGo = function(url) {
			if(url) {
				state.go(url);
			}
		}
		
	}]);
});