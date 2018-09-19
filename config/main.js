require.config({
	
	//baseUrl : '',
	
	'paths' : {
		'app'        : 'app',
		'base'       : 'base',
		
		'jquery'     : '../libs/jquery-3.3.1.min',
		
		'angular'    : '../libs/angularjs/angular.min',
		
		'bootstrap'  : '../libs/bootstrap/js/bootstrap.min',
		
		// //unpkg.com/angular-ui-router@0.4.2/release/angular-ui-router.js
		'uiRouter'  : '../libs/angular-ui-router',
		
		'router'     : 'router',
		
		'layer'      : '../libs/layui/layer/layer',
		'laydate'    : '../libs/layui/laydate/laydate'
		
	},
	
	'map' : {
		'*' : {
			'css' : '../libs/require-css.min'
		}
	},
	
	'shim' : {
		
		'angular'  : {
			exports : 'angular'
		},
		
		'bootstrap' : ['css!../libs/bootstrap/css/bootstrap.min.css'],
		
		'uiRouter' : {
			deps  : ['angular']
		},
		
		'router' : ['uiRouter'],
		
		'layer'    : ['css!../libs/layui/layer/theme/default/layer.css'],
		'laydate'  : ['css!../libs/layui/laydate/theme/default/laydate.css'],
		
		'base'     : ['jquery', 'layer', 'laydate', 'bootstrap', 'css!base.css'],
		
		'app'      : ['base']
	}
	
	//'urlArgs' : 't=' + new Date().getTime()
	
});

require(['app', 'router'], function() {
	angular.bootstrap(document, ['myApp']);
});
