(function(win, doc, factory) {
	win.touch = factory();
})(window, document, function(){
	var that;
	var startX = 0,
		startY = 0,
		endX = 0,
		endY = 0;

	/*判断是否单次手势，因为在move的时候判断的，不需要频繁触发*/
	var isActiveFlag = false;

	var cfg = {
		Sensitivity: 50
	}

	function getDirection(){

	}

	function start(e) {
		isActiveFlag = true;
		startX = e.touches[0].clientX || 0;
		startY = e.touches[0].clientY || 0;
	}

	function end(e) {
		isActiveFlag = false;
	}

	function move(e) {
		endX = e.touches[0].clientX || 0;
		endY = e.touches[0].clientY || 0;

		if (!isActiveFlag) return;

		if (Math.abs(endX - startX) >= cfg.Sensitivity || Math.abs(endY - startY) >= cfg.Sensitivity) {
			that && that.events['touch' + getDirection(startX, startY, endX, endY)] && that.events['touch' + getDirection(startX, startY, endX, endY)].forEach(function(item) {
				typeof(item.callBack) === 'function' && item.callBack(e)
			})
			isActiveFlag = false;
		}
	}

	function cancel(e) {
		isActiveFlag = false;
	}

	/*传入起始点以及终点的坐标值，得到移动方向*/
	function getDirection(x1, y1, x2, y2) {
		return (Math.abs(x1 - x2) > Math.abs(y1 - y2)) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
	}

	function toucher(dom) {
		that = this;
		this.dom = dom;
		/*事件回调对象*/
		this.events = {};

		dom.addEventListener('touchstart', start);
		dom.addEventListener('touchend', end);
		dom.addEventListener('touchmove', move);
		dom.addEventListener('touchcancel', cancel);
	}

	/*注册一个事件回调*/
	toucher.prototype.attach = function(eventName, callBack) {
		if ('string' !== typeof(eventName) || 'function' !== typeof(callBack)) return this;

		!this.events[eventName] && (this.events[eventName] = []);

		this.events[eventName].push({
			callBack: callBack
		})
		
		return this;
	}

	/*销毁一个事件回调*/
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