(function(win, doc, factory) {
	win.touch = factory();
})(window, document, function(){
	var that = this;

	function start(e) {
		
	}

	function end(e) {

	}

	function move(e) {

	}

	function cancel(e) {

	}

	function toucher(dom) {
		this.dom = dom;
		/*事件回调对象*/
		this.events = {};

		dom.addEventListener('touchstart', start);
		dom.addEventListener('touchend', end);
		dom.addEventListener('touchmove', move);
		dom.addEventListener('touchcancel', cancel);
	}

	toucher.prototype.attach = function(eventName, callBack) {
		if ('string' !== typeof(eventName) || 'function' !== typeof(callBack)) return this;

		!this.events[eventName] && (this.events[eventName] = []);

		this.events[eventName].push({
			callBack: callBack
		})
		
		return this;
	}

	toucher.prototype.detech = function(eventName, callBack) {
		if ('string' !== typeof(eventName) || 'function' !== typeof(callBack)) return this;

		for(i in this.events) {
			if (i === eventName) {
				this.events[i].forEach(function(item, index) {
					if (callBack === item.callBack) {
						this.events[i].splice(index, 1);
					}
				}.bind(this))
			}
		}
		
		return this;
	}

	return function(dom) {
		return new toucher(dom);
	};
});