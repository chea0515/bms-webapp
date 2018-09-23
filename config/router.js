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
		
		$stateProvider
		.state({
			'name'  : 'page',
			'url'   : '/page',
			'views' : {
				'top' : {
					'url'         : '/top',
					'templateUrl' : basePath + 'pages/base/top.html',
					'controller'  : 'topController',
					'resolve'     : {
						'deps' : app.loadDepsSrc(basePath + 'pages/base/topController.js')
					}
				},
				
				'left' : {
					'url'         : '/left',
					'templateUrl' : basePath + 'pages/base/left.html',
					'controller'  : 'leftController',
					'resolve'     : {
						'deps' : app.loadDepsSrc(['directive', basePath + 'pages/base/leftController.js'])
					}
				},
				
				'main' : {
					'url'         : '/main',
					'templateUrl' : basePath + 'pages/base/main.html',
					'controller'  : 'mainController',
					'resolve'     : {
						'deps' : app.loadDepsSrc(basePath + 'pages/base/mainController.js')
					}
				}
			}
		})
		//
		.state('page.home', {
			'url'         : '/home',
			'templateUrl' : basePath + 'pages/home/home.html',
			'controller'  : 'homeController',
			'resolve'     : {
				'deps' : app.loadDepsSrc(basePath + 'pages/home/homeController.js')
			}
		})
		//
		.state('page.myinfo', {
			'url'         : '/system/myinfo',
			'templateUrl' : basePath + 'pages/system/myinfo.html',
			'controller'  : 'myinfoController',
			'resolve'     : {
				'deps' : app.loadDepsSrc(basePath + 'pages/system/myinfoController.js')
			}
		})
		//article list
		.state('page.articlelist', {
			'url'         : '/article/list',
			'templateUrl' : basePath + 'pages/article/articlelist.html',
			'controller'  : 'articleListController',
			'resolve'     : {
				'deps' : app.loadDepsSrc(basePath + 'pages/article/articleListController.js')
			}
		});;
		
		
	}]);
});
