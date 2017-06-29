$.extend({
	
	wpJsonMerge: function(options){
		var options = $.extend({
			url: '/wp-json/wp/v2/uri',
			perPage: 100,
		}, options);
		
		$.ajax({
			url: options.url,
			data: { per_page: options.perPage, page: 1 },
			dataType: 'json',
		}).done(function(json, textStatus, jqXHR){
			var jqXHRList = [];
			var pages = jqXHR.getResponseHeader('X-WP-TotalPages');
			for(var i=1; i<=pages; i++){
				jqXHRList.push($.ajax({
					url: options.url,
					data: { per_page: options.perPage, page: i },
					dataType: 'json',
				}));
			}
			$.when.apply($, jqXHRList).done(function(){
				var targetData = [];
				$.each(arguments, function(i,e){ //e:[data,textStatus,jqXHR]
					$.each(e[0], function(idx,elm){
						targetData.push(elm);
					});
				});
				return targetData;
			});
		});
	}
	
});
