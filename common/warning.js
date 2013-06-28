(function() {
	'use strict';

	var firefox = typeof self !== 'undefined' && self.port;

	function getCurrentUrl() {
		return decodeURIComponent(location.href.toString().split('?')[1]);
	}

	document.getElementById('current_url').innerText = getCurrentUrl();
	document.getElementById('go_back').onclick = history.back;

	if (firefox) {
		self.port.on("redirectTo", function(url) {
			window.location.href = url;
		});

		document.getElementById('force_continue').onclick = function() {
			self.port.emit("allowCurrentUrl", getCurrentUrl());
		};
	} else {
		document.getElementById('force_continue').onclick = function() {
			chrome.runtime.sendMessage({allowCurrentUrl: getCurrentUrl()});
		};
	}
}).call(this);
