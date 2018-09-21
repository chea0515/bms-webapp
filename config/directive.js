define(['app'], function(app) {
	
	let reg = app.register;
	
	/*
	 * repeat finish
	 */
	reg.directive('repeatFinish', [function() {
		return {
			'restrict': 'A',
			'link': function(scope, ele, attr) {
				if (scope.$last === true) {
					let fnc = attr.repeatFinish;
					alert(fnc)
					//scope.$eval(fnc);
					//let fnc = scope.$parent[attr.repeatFinish];
					//if (fnc) fnc();
				}
			}
		};
	}]);
	
});