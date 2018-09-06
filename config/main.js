require.config({
	
	baseUrl : "",
	
	paths   : {
		"app"     : "app",
		"angular" : "../libs/angularjs/angularjs.min",
		"router"  : "../libs/angularjs/angular-ui-router.min"
	},
	
	shim : {
		"angular" : {
			exports : "angular"
		},
		"router" : {
			deps : [ "angular" ]
		}
	}
	
});

require(["app"], function() {
	angular.bootstrap(document, "app");
});
