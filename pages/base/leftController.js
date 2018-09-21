define(['app'], function(app) {
	app.register.controller('leftController',['$scope', '$state', '$timeout',
		function(scope, state, timeout) {
		
		scope.menuState = true;
		
		// menu
		scope.menus = null;
		$.ccGet(basePath + 'config/menu.json', function(d) {
			if(d && d.root) {
				timeout(function() {
					scope.menus = d.root;
				}, 100);
			}
		});
		
		scope.menuGo = function(url) {
			if(url) {
				state.go(url);
			}
		}
		
		scope.openMenu = function(menuState) {
			alert(menuState);
			scope.menuState = !scope.menuState;
		};
		
	}]);
});