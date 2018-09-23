require.config(ccOptions.requireConfig);

require(['app', 'router'], function() {
	angular.bootstrap(document, ['myApp']);
});
