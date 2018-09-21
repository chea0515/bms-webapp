define(['app'], function(app) {
	app.register.controller('leftController',['$scope', '$state', '$timeout',
		function(scope, state, timeout) {
		
		// menu init
		scope.menuLists = sessionStorage.getItem('menuLists')?JSON.parse(sessionStorage.getItem('menuLists')):null;
		scope.initMenus = function() {
			if (!scope.menuLists) {
				$.ccGet(basePath + 'config/menu.json', function(d) {
					if(d && d.root) {
						timeout(function() {
							scope.menuLists = d.root;
							sessionStorage.setItem('menuLists', JSON.stringify(d.root));
						}, 100);
					}
				});
			}
		};
		scope.initMenus();
		
		scope.menuLoadFinish = function() {
			alert()
		}
		
		const menuStatus = ['glyphicon-chevron-down', 'glyphicon-chevron-right'];
		scope.menuIdPrefix = '_left_m_id_'; // 菜单id前缀
		//sessionStorage.clear();
		
		scope.$watch('menuLoadProgress', function(newValue, oldValue) {
			console.log('newValue-->' + newValue);
		});
		
		/*
		 * init menu status
		 * type 1: switch, 2: init
		 */
		/*
		const menuSelectedItem =
			sessionStorage.getItem('menuSelectedItem')?JSON.parse(sessionStorage.getItem('menuSelectedItem')) : {'id': '', 'styles': 'm-sel-item' };
		scope.initMenuStatus = function(type, menuId) {
			let _menuId = menuSelectedItem.id;
			switch (type) {
				case 1:
					if (_menuId) {
						$('#' + _menuId).removeClass(menuSelectedItem.styles);
					}
					
					$('#' + menuId).addClass(menuSelectedItem.styles);
					menuSelectedItem.id = menuId;
					sessionStorage.setItem('menuSelectedItem', JSON.stringify(menuSelectedItem));
					break;
				case 2:
					if (_menuId) {
						$('#' + _menuId).addClass(menuSelectedItem.styles);
						let parentLiIds = _menuId.substring(scope.menuIdPrefix.length);
						parentLiIds = scope.menuIdPrefix + parentLiIds.substring(0, parentLiIds.indexOf('_'));
						let parentLis = $('#_left_m_id_0_0');//$('li[id^='+ parentLiIds + ']');
						timeout(function() {
							let parentLis = $('#_left_m_id_0_0');//$('li[id^='+ parentLiIds + ']');
							console.log(parentLis);
						}, 200);
					}
					break;
				default:
					break;
			}
		};
		*/
		
		// init menu status
		//scope.initMenuStatus(2);
		
		scope.menuGo = function(eve, url, menuId) {
			if(url) {
				state.go(url);
				//scope.initMenuStatus(1, menuId);
			}
			
			scope.openMenu(eve, menuId);
		}
		
		scope.openMenu = function(eve, menuId) {
			let li = $('#' + menuId);
			if (li.hasClass('m-on')) {
				li.removeClass('m-on')
				  .find('>a .m-icon').removeClass(menuStatus[0]).addClass(menuStatus[1]);
			} else {
				li.addClass('m-on')
				  .find('>a .m-icon').removeClass(menuStatus[1]).addClass(menuStatus[0]);
			}
			
			li.siblings().each(function(i, d) {
				if ($(d).hasClass('m-on')) {
					$(d).removeClass('m-on')
					    .find('>a .m-icon').removeClass(menuStatus[0]).addClass(menuStatus[1]);
				}
			});
		};
	
	}]);
});