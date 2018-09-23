define(['app'], function(app) {
	app.register.controller('leftController',['$scope', '$state', '$timeout',
		function(scope, routeState, timeout) {
		
		// 菜单加载进度记录num
		scope.menuLoadProgress = 0;
		// 菜单初始化配置
		const menuInitOptions = ccOptions.menuInitConfig;
		 // 菜单id前缀
		scope.menuIdPrefix = menuInitOptions.idPrefix;
		// 加载已存放在sessionStorage里的菜单列表
		const menuDataInfo = sessionStorage.getItem('menuDataInfo') ?
			JSON.parse(sessionStorage.getItem('menuDataInfo')) : 
			{'size': menuInitOptions.size, 'list': menuInitOptions.list};
		scope.menuLists = menuDataInfo.list ? menuDataInfo.list : null;
		// sessionStorage 清除
	    //sessionStorage.clear();
	    
	    // 加载菜单列表信息
		scope.initMenus = function() {
			if (!scope.menuLists) {
				$.ccGet(basePath + 'config/menuList.json', function(d) {
					if(d && d.root) {
						let dTree = $.convertTree(d.root);
						let _menuDataInfo = {
							'size': d.root.length,
							'list': dTree
						};
						sessionStorage.setItem('menuDataInfo', JSON.stringify(_menuDataInfo));
						
						timeout(function() {
							scope.menuLists = dTree;
						}, 100);
					}
				});
			}
		};
		scope.initMenus();
		
		/*
		 * init menu status
		 * type 1: switch, 2: init
		 */
		scope.menuSelectedItem = sessionStorage.getItem('menuSelectedItem')?
			JSON.parse(sessionStorage.getItem('menuSelectedItem')) : {'id': '', 'styles': 'm-sel-item' };
		scope.initMenuStatus = function(type, menuId) {
			let pillCss = function(_menuId) {
				$('#' + _menuId).addClass(scope.menuSelectedItem.styles);
				scope.menuSelectedItem.id = _menuId;
				sessionStorage.setItem('menuSelectedItem', JSON.stringify(scope.menuSelectedItem));
			};
			let _menuId = scope.menuSelectedItem.id;
			let obj = _menuId ? $('#' + _menuId) : null;
			if (!obj) {
				obj = $('#' + scope.menuIdPrefix + menuInitOptions.id);
				pillCss(scope.menuIdPrefix + menuInitOptions.id);
				scope.menuGo('page.articlelist', menuInitOptions.id);
			}
			
			switch (type) {
				case 1:
					obj.removeClass(scope.menuSelectedItem.styles);
					pillCss(menuId);
					break;
				case 2:
					obj.addClass(scope.menuSelectedItem.styles);
					let parentLis = obj.parents('li');
					$(parentLis).each(function(i, d) {
						if (!$(d).hasClass('m-on')) {
							$(d).addClass('m-on')
							    .find('>a .m-icon')
							    .removeClass(menuInitOptions.icon[1])
							    .addClass(menuInitOptions.icon[0]);
						}
					});
					break;
				default:
					break;
			}
		};
		
		// init menu status
		scope.menuLoadFinish = function(mLen) {
			scope.menuLoadProgress += mLen;
			if (menuDataInfo.size == scope.menuLoadProgress) {
				scope.initMenuStatus(2);
			}
		}
		
		// 页面跳转
		scope.menuGo = function(url, menuId) {
			menuId = scope.menuIdPrefix + menuId;
			if(url) {
				routeState.go(url);
				scope.initMenuStatus(1, menuId);
			}
			
			scope.openMenu(menuId);
		}
		
		// 更改列表状态
		scope.openMenu = function( menuId) {
			let li = $('#' + menuId);
			if (li) {
				if (li.hasClass('m-on')) {
					li.removeClass('m-on')
					  .find('>a .m-icon')
					  .removeClass(menuInitOptions.icon[0])
					  .addClass(menuInitOptions.icon[1]);
				} else {
					li.addClass('m-on')
					  .find('>a .m-icon')
					  .removeClass(menuInitOptions.icon[1])
					  .addClass(menuInitOptions.icon[0]);
				}
				
				li.siblings().each(function(i, d) {
					if ($(d).hasClass('m-on')) {
						$(d).removeClass('m-on')
						    .find('>a .m-icon')
						    .removeClass(menuInitOptions.icon[0])
						    .addClass(menuInitOptions.icon[1]);
					}
				});
			}
		};
	
	}]);
});