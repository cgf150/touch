(function(win, doc, factory) {
	win.touch = factory();
})(window, document, function(){
	function toucher(dom) {
		this.dom = dom;
		dom.addEventListener('touchstart', function(){
			console.log('touchstart')
		});
		dom.addEventListener('touchend', function(){
			console.log('touchend')
		});
		dom.addEventListener('touchmove', function(){
			console.log('touchmove')
		});
		dom.addEventListener('touchcancel', function(){
			console.log('touchcancel')
		});
	}

	return toucher;
});