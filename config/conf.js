/**
 * base path.
 */
const basePath = 'http://127.0.0.1:8020/bms-webapp/';

/**
 * libs path
 */
const libsPath = basePath + 'libs/';

/**
 * common options
 */
const ccOptions = {
	/*
	 * base path
	 */
	'basePath'             : 'http://127.0.0.1:8020/bms-webapp/',
	
	/*
	 * require
	 */
	'requireConfig' : {
		'paths' : {
			'app'        : 'app',
			'base'       : 'base',
			
			'jquery'     : '../libs/jquery-3.3.1.min',
			
			'angular'    : '../libs/angularjs/angular.min',
			'directive' : 'directive',
			
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
			
			'directive' : ['router'],
			
			'layer'    : ['css!../libs/layui/layer/theme/default/layer.css'],
			'laydate'  : ['css!../libs/layui/laydate/theme/default/laydate.css'],
			
			'base'     : ['jquery', 'layer', 'laydate', 'bootstrap', 'css!base.css'],
			
			'app'      : ['base']
		}
	},
	
	'routerConfig' : [
		// base
		{
			'name'  : 'page',
			'url'   : '/page',
			'views' : {
				'top' : {
					'url'         : '/top',
					'templateUrl' : basePath + 'pages/base/top.html',
					'controller'  : 'topController',
					'relyOn'     : [basePath + 'pages/base/topController.js']
				},
				
				'left' : {
					'url'         : '/left',
					'templateUrl' : basePath + 'pages/base/left.html',
					'controller'  : 'leftController',
					'relyOn'     : ['directive', basePath + 'pages/base/leftController.js']
				},
				
				'main' : {
					'url'         : '/main',
					'templateUrl' : basePath + 'pages/base/main.html',
					'controller'  : 'mainController',
					'relyOn'     : [basePath + 'pages/base/mainController.js']
					}
				}
		},
		// home
		{
			'uiSref' : 'page.home',
			'options': {
				'url'         : '/home',
				'templateUrl' : basePath + 'pages/home/home.html',
				'controller'  : 'homeController',
				'relyOn'     : [basePath + 'pages/home/homeController.js']
			}
		},
		// myinfo
		{
			'uiSref' : 'page.myinfo',
			'options': {
				'url'         : '/system/myinfo',
				'templateUrl' : basePath + 'pages/system/myinfo.html',
				'controller'  : 'myinfoController',
				'relyOn'     : [basePath + 'pages/system/myinfoController.js']
			}
		},
		// articlelist
		{
			'uiSref' : 'page.articlelist',
			'options': {
				'url'         : '/article/list',
				'templateUrl' : basePath + 'pages/article/articlelist.html',
				'controller'  : 'articleListController',
				'relyOn'     : [basePath + 'pages/article/articleListController.js']
			}
		}
	],
	
	/*
	 * menu init options.
	 */
	'menuInitConfig' : {
		// 菜单id前缀
		'idPrefix': '_left_m_id_',
		// 状态icon(打开或者关闭图标)
		'icon': ['glyphicon-chevron-down', 'glyphicon-chevron-right'],
		// 加载页面
		'url': 'page.articlelist',
		// 菜单id
		'id': '1_0_0',
		// 菜单列表长度
		'size': 15,
		// 菜单列表
		'list': null
	}
};