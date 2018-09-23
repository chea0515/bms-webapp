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
	},
	
	/**
	 * convert list to tree menu.
	 * @param {Object} rows
	 */
	convertTree: function(rows) {
		let hasLeaf = function(rows, pid) {
			for(let i=0; i<rows.length; i++){
				if (rows[i].id == pid) return true;
			}
			
			return false;
		};
		
		let nodes = [];
		rows.forEach(row => {
			if (!hasLeaf(rows, row.pid)) {
				nodes.push({
					id: row.id,
					title: row.title,
					url: row.url || "",
					icon: row.icon || ""
				});
			}
		});
		
		let toDo = [];
		nodes.forEach(node => {
			toDo.push(node);
		});
		
		while(toDo.length) {
			let node = toDo.shift();
			rows.forEach(row => {
				if (row.pid == node.id) {
					let child = {
						id: row.id,
						title: row.title,
						url: row.url || "",
						icon: row.icon || ""
					};
					
					if (node.children) {
						node.children.push(child);
					} else {
						node.children = [child];
					}
					toDo.push(child);
				}
			});
		}
		
		return nodes;
	}
	
});

/**
 * jquery fn extends
 */
jQuery.fn.extend({
	//
});