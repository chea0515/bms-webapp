define(['app'], function(app) {
	app.register.controller('articleListController', ['$scope', function(scope) {
		
		scope.articlePage = {
			url: requestPath + 'api/gmp/article/alllist',
			pageNum: 1,
			pageSize: 20,
			totalCount: 203,
			totalPage: 21,
			list: [
				{
					title: 'aaaa',
					content: 'fasjfhekuthwetwe',
					addTime: '2018/09/20'
				},
				{
					title: 'bbb',
					content: '地舵手主天',
					addTime: '2017/02/11'
				}
			]
		};
	}]);
});