let basePath = 'http://127.0.0.1:8020/bms-webapp/';

/**
 * jquery extends
 */
jQuery.extend({
	
	/* ajax */
	ccAjax: function(options) {
		if (!options) {
			return null;
		}
		let index = layer.load();
		let _success = function(d, s) {
			layer.close(index);
			if(options.success && typeof(options.success) == 'function') {
				options.success(d, s);
			}
		};
		let _error = function(d) {
			layer.close(index);
			if(options.error && typeof(options.error) == 'function') {
				options.error(d);
			}
		};
		
		let _options = {
			'type': options.type || 'get',
			'url': options.url || "",
			'data': options.data || {},
			'sync': options.sync || true,
			'success': function(d, s) {
				_success(d, s);
			},
			'error': function(d) {
				_error(d);
			}
		};
		
		$.ajax(_options);
	},
	
	/* get */
	ccGet: function() {
		let args = arguments;
		let options = {
			'type': 'GET',
			'url': args[0],
			'data': null,
			'success': null,
			'error': null
		};
		switch(args.length) {
			case 2:
			    options.success = args[1];
			    options.error = args[1];
			break;
			case 3:
			    options.success = args[2];
			    options.error = args[2];
			break;
			default:
			break;
		}
		
		this.ccAjax(options);
	},
	
	/*
	 * post
	 * options:
	 *     (1) url, callback
	 *     (2) url, data, callback
	 */
	ccPost: function() {
		let args = arguments;
		let options = {
			'type': 'POST',
			'url': args[0],
			'data': null,
			'success': null,
			'error': null
		};
		switch(args.length) {
			case 2:
			    options.success = args[1];
			    options.error = args[1];
			break;
			case 3:
			    options.success = args[2];
			    options.error = args[2];
			break;
			default:
			break;
		}
		
		this.ccAjax(options);
	}
	
});
