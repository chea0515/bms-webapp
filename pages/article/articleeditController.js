define(['app'], function(app) {
	app.register.controller('articleEditController', ['$scope', '$timeout', function(scope, timeout) {
		
		scope.article = {};
		scope.contentIsEmpty = true;
		
		const KE = KindEditor.create('#contentId', {
			'minHeight': 500,
			'items' : ['source', 'code', 'justifyleft', 'justifycenter', 'justifyright',
			        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
			        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen',
			        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
			        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
			        'insertfile', 'table', 'hr', 'emoticons', 'link', 'unlink'
			],
			'resizeType' : 1,
			'langType' : 'zh-CN',
			'afterFocus' : function() {
				timeout(function() {
					scope.contentIsEmpty = false;
				});
			},
			'afterBlur' : function() {
				//KE.sync();
				timeout(function(){
					if (KE.html()) {
					scope.contentIsEmpty = false;
				} else {
					scope.contentIsEmpty = true;
				}
				});
			},
			'uploadJson' : basePath + '/bms/api/',
			'afterUpload' : function(url) {
				alert(url)
			}
		});
		
		/*
		 * 表单提交
		 * type 1:发布 2:保存草稿 3.返回
		 */
		scope.submitForm = function(type) {
			scope.article.content = KE.html();
			
			if (!scope.contentIsEmpty && scope.articleEditForm.$valid) {
				$.ccPost(basePath + '/', scope.article, function(d, s) {
					console.log(d)
				});
			}
		}
		
	}]);
});