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
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			gap: "5px",
		})
		document.body.appendChild(mainMenu)
	}

	mainMenu.appendChild(downloadButton())
	mainMenu.appendChild(speedButton())
}


function downloadButton(){
	let div = document.createElement("div")
	Object.assign(div.style, {
		cursor: "pointer",
	})
	div.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<path stroke="lightblue" stroke-linecap="round" stroke-width="1.5" d="M12 7v7m0 0 3-3m-3 3-3-3"/>
			<path stroke="lightblue" stroke-linecap="round" stroke-width="1.5" d="M16 17H8m14-5c0 4.71 0 7.07-1.46 8.54C19.07 22 16.7 22 12 22c-4.71 0-7.07 0-8.54-1.46C2 19.07 2 16.7 2 12c0-4.71 0-7.07 1.46-8.54C4.93 2 7.3 2 12 2c4.71 0 7.07 0 8.54 1.46.97.98 1.3 2.35 1.4 4.54"/>
		</svg>
	`
	div.onclick = _=>{
		let video = getCurrent("video")
		if (!video){return}
	}
	return div
}

function speedButton(){
	let div = document.createElement("div")
	Object.assign(div.style, {
		
	})
	div.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" fill="lightblue" viewBox="0 0 20 20">
			<path d="M10 20C4.5 20 0 15.5 0 10S4.5 0 10 0s10 4.5 10 10-4.5 10-10 10zm0-18c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/>
			<path d="M8.6 11.4c-.8-.8-2.8-5.7-2.8-5.7s4.9 2 5.7 2.8c.8.8.8 2 0 2.8-.9.9-2.1.9-2.9.1z"/>
		</svg>
	`
	let button = div.querySelector("svg")
	Object.assign(button.style, {
		cursor: "pointer",
	})
	button.onclick = _=>{

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
