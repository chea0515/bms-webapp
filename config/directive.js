define(['app'], function(app) {
	
	let reg = app.register;
	
	/*
	 * repeat progress.
	 */
	reg.directive('repeatProgress', [function() {
		return {
			'restrict': 'A',
			'link': function(scope, ele, attr) {
				let fnc = attr.repeatProgress;
				scope.$eval(fnc);
			}
		};
	}]);
	
	/*
	 * repeat finish.
	 */
	reg.directive('repeatFinish', [function() {
		return {
			'restrict': 'A',
			'link': function(scope, ele, attr) {
				if (scope.$last === true) {
					let fnc = attr.repeatFinish;
					scope.$eval(fnc);
				}
			}
		};
	}]);
	
	// page helper
	reg.directive('pageHelper', [function() {
		return {
			'scope': {
				'page': '=page'
			},
			'restrict': 'E',
			'template': '<nav class="text-right">'
			    +  '<div style="display:inline-block;margin:20px 0;margin-right:6px;overflow:hidden;">'
			    +   '<span style="font-size:1.6rem;">{{page.pageNum}} / {{page.totalPage}}</span>&nbsp;&nbsp;'
			    +   '<input type="number" ng-model="toPageNum" ng-blur="toPage(\'to\')"'
			    +       'class="form-control" style="width:73px;display:inline-block;text-align:center;"></div>'
			    +  '<ul class="pagination">'
			    +   '<li><a href="javascript:;" ng-click="toPage(\'previous\')"><span>&laquo;</span></a></li>'
			    +   '<li ng-repeat="num in pageNumList" ng-class="{true:\'cc-page-on disabled\', false:\'\'}[num==page.pageNum]">'
			    +     '<a href="javascript:;" ng-click="toPage(\'num\', num)">{{num}}</a></li>'
			    +   '<li><a href="javascript:;" ng-click="toPage(\'next\')"><span>&raquo;</span></a></li>'
			    +'</ul></nav>',
			
			'link': function(scope, ele, attr) {
				scope.toPageNum = 0;
				scope.pageNumList = [1];
				const url = scope.page.url;
				
				/*
				 * calc page num list
				 * type 0: init, 1:onload
				 */
				const calcPageNumList = function(type) {
					const totalPage = scope.page.totalPage;
					// init
					if (type == 0) {
						if (totalPage > 0) {
							let i = 1;
							if (totalPage <= 5) {
								while(++i <= totalPage) {
									scope.pageNumList.push(i);
								}
							} else {
								while(++i <= 5) {
									scope.pageNumList.push(i);
								}
							}
						}
					} 
					// onload
					else if (type == 1 && totalPage > 5) {
						if (scope.page.pageNum <= 5) {
							scope.pageNumList = [];
							let i = 0;
							while(++i <= 5) {
								scope.pageNumList.push(i);
							}
						} else {
							if (scope.page.pageNum < scope.pageNumList[0]
								    || scope.page.pageNum > scope.pageNumList[scope.pageNumList.length - 1]) {
								scope.pageNumList = [];
								let startNum = (scope.page.pageNum % 5 == 0)
								    ? (scope.page.pageNum - 5) 
								    : (scope.page.pageNum - scope.page.pageNum % 5),
								endNum = (startNum + 5 <= totalPage) ? (startNum + 5) : totalPage;
								while (++startNum <= endNum) {
									scope.pageNumList.push(startNum);
								}
							}
						}
					}
				};
				
				// init page num list
				calcPageNumList(0);
				
				// num/toNum/previous/next
				scope.toPage = function(type, num) {
					switch(type) {
						case 'to':
						    if (scope.page.pageNum != scope.toPageNum) {
						    	if (scope.toPageNum > scope.page.totalPage || scope.toPageNum < 1) {
									// 重置值
									scope.toPageNum = 1;
								}
								scope.syncPage(scope.page.pageNum = scope.toPageNum);
						    }
						break;
						case 'previous':
							if (scope.page.pageNum <= 1) {
								// 已经是第一页
							} else {
								scope.syncPage(scope.page.pageNum -= 1);
							}
						break;
						case 'next':
							if (scope.page.pageNum >= scope.page.totalPage) {
								// 已经是最后一页
							} else {
								scope.syncPage(scope.page.pageNum += 1);
							}
						break;
						case 'num':
							if (scope.page.pageNum != num) {
								scope.syncPage(scope.page.pageNum = num);
							}
						break;
						default:
						break;
					}
					
					calcPageNumList(1);
				}
				
				/*
				 * onload data
				 */
				scope.syncPage = function(pageNum) {
					if (!url) {
						return false;
					}
					
					$.ccPost(url, {pageNum: pageNum}, function(d, s) {
						if (d && d.list && d.list.length > 0) {
							scope.page.list = d.list;
						}
					});
				};
			}
		};
	}]);
});