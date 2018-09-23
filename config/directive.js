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
	
	//
	
});