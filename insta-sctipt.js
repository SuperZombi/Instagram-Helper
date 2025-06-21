var onUrlChange = urlObserver()
window.onload = function() {
	main()
}
function main(){
	let mainMenu = document.querySelector("#insta-helper-menu")
	if (!mainMenu){
		mainMenu = document.createElement("div")
		mainMenu.id = "insta-helper-menu"
		Object.assign(mainMenu.style, {
			position: "fixed",
			right: 0,
			top: 0,
			bottom: 0,
			width: "40px",
			padding: "10px",
		})
		document.body.appendChild(mainMenu)
	}

	mainMenu.appendChild(downloadButton())
	mainMenu.appendChild(speedButton())
}


function downloadButton(){
	let div = document.createElement("div")
	Object.assign(div.style, {

	})
	div.onclick = _=>{

	}
	return div
}

function speedButton(){
	let div = document.createElement("div")
	Object.assign(div.style, {
		
	})
	div.onclick = _=>{

	}
	return div
}


/* Helpers */
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	const height = window.innerHeight || document.documentElement.clientHeight;
	const width = window.innerWidth || document.documentElement.clientWidth;
	return (
		!(rect.top == 0 && rect.left == 0 && rect.bottom == 0 && rect.right == 0) &&
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= height &&
		rect.right <= width
	);
}
function getCurrent(selector){
	let elements = document.querySelectorAll(selector)
	for (let element of elements) {
		if (isInViewport(element)) {
			return element
		}
	}
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
