(function($) {
	$.tablesorter = function(el, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		var base = this,
			$headers = $(el).find('th'),
			$trs = $(el).find('tbody tr'),
			options = $.extend({}, $.tablesorter.defaultOptions, options);

		// prevent text selection when double click
		$headers.attr('unselectable', 'on').mousedown(function() {
			return false;
		});

		// To decide sort by ascend or descend
		var operators = {};
		operators[options.ascendClass] = function(a, b) {
			return $.isNumeric(a) && $.isNumeric(b) ? parseFloat(a, 10) > parseFloat(b, 10) : a > b;
		},
		operators[options.descendClass] = function(a, b) {
			return $.isNumeric(a) && $.isNumeric(b) ? parseFloat(a, 10) < parseFloat(b, 10) : a < b;
		};

		base.init = function() {
			$headers.on('click', base.sort);
		};

		base.sort = function() {
			var index = $(this).index(),
				type = $(this).hasClass(options.ascendClass) ? options.descendClass : options.ascendClass,
				i, j, temp, $first, $second;

			// Class toggle
			$(this).toggleClass(options.ascendClass).removeClass(options.descendClass);
			if (!$(this).hasClass(options.ascendClass)) $(this).toggleClass(options.descendClass);
			$(this).siblings().removeClass(options.ascendClass).removeClass(options.descendClass);

			for (i = 0; i < $trs.length - 1; i++) {
				for (j = i + 1; j < $trs.length; j++) {
					$first = $($trs[i]);
					$second = $($trs[j]);
					if (operators[type]($first.find('td:eq(' + index + ')').html(), $second.find('td:eq(' + index + ')').html())) {
						temp = $first.html();
						$first.html($second.html());
						$second.html(temp);
					}
				}
			}
		};

		base.init();
	};

	$.tablesorter.defaultOptions = {
		ascendClass: 'ascend',
		descendClass: 'descend'
	};

	$.fn.tablesorter = function(options) {
		return this.each(function() {
			(new $.tablesorter(this, options));
		});
	};

})(jQuery);