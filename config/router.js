define(['app'], function(app) {
	app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
		function($controllerProvider, $compileProvider, $filterProvider, $provide) {
		app.register = {
			'controller' : $controllerProvider.register,
			'directive'  : $compileProvider.directive,
			'filter'     : $filterProvider.register,
			'service'    : $provide.service,
			'factory'    : $provide.factory
		};
	}]);
	
	app.loadDepsSrc = function(src) {
		
		return function($q, $rootScope) {
			let defer = $q.defer(), deps = [];
			angular.isArray(src) ? (deps = src) : deps.push(src);
			
			require(deps, function() {
				$rootScope.$apply(function() {
					defer.resolve();
				});
			});
			
			return defer.promise;
		};
	};
	
	app.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.when("", '/page/home').when("/page", '/page/home');
		
		// 初始化配置
		(ccOptions.routerConfig).forEach(rt => {
			if (rt.views) {
				for (let key0 in rt.views) {
					for (let key1 in rt.views[key0]) {
						if (key1 == 'relyOn') {
							rt.views[key0].resolve = {};
							rt.views[key0].resolve.deps = 
								app.loadDepsSrc(rt.views[key0].relyOn);
							delete rt.views[key0].relyOn;
						}
					}
				}
				$stateProvider.state(rt);
				
			} else {
				for (let key in rt.options) {
					if (key == 'relyOn') {
						rt.options.resolve = {};
						rt.options.resolve.deps = 
							app.loadDepsSrc(rt.options.relyOn);
						delete rt.options.relyOn;
					}
				}
				$stateProvider.state(rt.uiSref, rt.options);
			}
		});
	}]);
});
