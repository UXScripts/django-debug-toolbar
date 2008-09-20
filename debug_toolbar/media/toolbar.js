jQuery.noConflict();
jQuery(function() {
	jQuery.djDebug = function(data, klass) {
		jQuery.djDebug.init();
	}
	jQuery.extend(jQuery.djDebug, {
		init: function() {
			var current = null;
			jQuery('#djDebugPanelList li a').click(function() {
				current = jQuery('#djDebug #' + this.className);
				if (current.is(':visible')) {
					jQuery(document).trigger('close.djDebug');
				} else {
					jQuery('.panelContent').hide();
					current.show();
					jQuery.djDebug.open();
				}
				return false;
			});
			jQuery('#djDebug a.close').click(function() {
				jQuery(document).trigger('close.djDebug');
				return false;
			});
			jQuery('#djDebugWindow a.back').click(function() {
				console.dir(jQuery(this).parent());
				jQuery(this).parent().hide();
				return false;
			});
			jQuery('#djDebug a.remoteCall').click(function() {
				jQuery.djDebug.remote_call(this);
				return false;
			});
			jQuery('#djDebugTemplatePanel a.djTemplateShowContext').click(function() {
				jQuery.djDebug.toggle_content(jQuery(this).parent().next());
			});
		},
		open: function() {
			jQuery(document).bind('keydown.djDebug', function(e) {
				if (e.keyCode == 27) {
					jQuery.djDebug.close();
				}
			});
		},
		toggle_content: function(elem) {
			if (elem.is(':visible')) {
				elem.hide();
			} else {
				elem.show();
			}
		},
		remote_call: function(obj) {
			jQuery('#djDebugWindow').load(obj.href).show();
			
		},
		close: function() {
			jQuery(document).trigger('close.djDebug');
			return false;
		}
	});
	jQuery(document).bind('close.djDebug', function() {
		jQuery(document).unbind('keydown.djDebug');
		jQuery('.panelContent').hide();
	});
});

jQuery(function() {
	jQuery.djDebug();
});