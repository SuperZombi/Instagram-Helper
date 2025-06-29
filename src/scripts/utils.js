function getReelId(url) {
	const match = url.match(/\/reels?\/([^/?#]+)/i);
	return match ? match[1] : null;
}
function isReels(){
	return window.location.href.startsWith("https://www.instagram.com/reels/")
}
function isInViewport(element, percentVisible=100) {
	const rect = element.getBoundingClientRect();
	const windowHeight = window.innerHeight || document.documentElement.clientHeight;
	const windowWidth = window.innerWidth || document.documentElement.clientWidth;
	if (rect.bottom <= 0 || rect.top >= windowHeight || rect.right <= 0 || rect.left >= windowWidth) {
		return false;
	}
	const elementHeight = rect.height;
	const elementWidth = rect.width;
	const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
	const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

	const visibleArea = visibleHeight * visibleWidth;
	const totalArea = elementHeight * elementWidth;
	const visibleRatio = visibleArea / totalArea;
	return visibleRatio >= (percentVisible / 100);
}

function getCurrent(selector, percentVisible=100) {
	const elements = document.querySelectorAll(selector);
	for (let element of elements) {
		if (isInViewport(element, percentVisible)) {
			return element;
		}
	}
	return null;
}
function getNeighbours(selector, percentVisible=100){
	const elements = document.querySelectorAll(selector);
	let previous = null;
	let ready = false;
	for (let element of elements) {
		if (ready){
			return {
				"previous": previous,
				"next": element
			}
		}
		if (isInViewport(element, percentVisible)) {
			ready = true
		} else {
			previous = element
		}
	}
	return {"previous":previous,"next":null}
}
function urlObserver(){
	let subs = []
	let oldUrl = window.location.href
	setInterval(_=>{
		if (oldUrl !== window.location.href){
			subs.forEach(callback=>{
				callback(window.location.href)
			})
			oldUrl = window.location.href
		}
	}, 100)
	return (callback)=>{
		subs.push(callback)
	}
}
