var onUrlChange = urlObserver()
var currentSpeed = 1

window.onload = function() {
	if (isReels()){reels()}
	onUrlChange(_=>{
		if (isReels()){
			reels()
		} else {
			let el = document.querySelector("#insta-helper-menu")
			if (el){el.remove()}
		}
	})
}
function reels(){
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
			gap: "10px",
		})
		document.body.appendChild(mainMenu)
		mainMenu.appendChild(scrollUp())
		mainMenu.appendChild(downloadButton())
		mainMenu.appendChild(speedButton())
		mainMenu.appendChild(scrollDown())
	}
}


function downloadButton(){
	let div = document.createElement("div")
	div.title = "Download"
	Object.assign(div.style, {
		cursor: "pointer",
	})
	div.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" stroke="lightblue" stroke-width="1.5" fill="none" stroke-linecap="round" viewBox="0 0 24 24">
			<path d="M12 7v7m0 0 3-3m-3 3-3-3"/>
			<path d="M16 17H8m14-5c0 4.71 0 7.07-1.46 8.54C19.07 22 16.7 22 12 22c-4.71 0-7.07 0-8.54-1.46C2 19.07 2 16.7 2 12c0-4.71 0-7.07 1.46-8.54C4.93 2 7.3 2 12 2c4.71 0 7.07 0 8.54 1.46.97.98 1.3 2.35 1.4 4.54"/>
		</svg>
	`
	div.onclick = _=>{
		if (!div.getAttribute("disabled")){
			div.setAttribute("disabled", true)
			div.style.cursor = "wait"
			let video = getCurrent("video")
			if (!video){return}
			let stream = video.captureStream()
			let recordedChunks = []
			let recorder = new MediaRecorder(stream, { mimeType : 'video/webm' })
			recorder.ondataavailable = e=>{
				if (e.data.size > 0) {
					recordedChunks.push(e.data)
				}
			}
			recorder.onstop = _=>{
				let blob = new Blob(recordedChunks, { type: 'video/webm' });
				let url = URL.createObjectURL(blob)
				let a = document.createElement('a')
				a.href = url
				a.download = `${getReelId(window.location.href)}.webm`
				a.click()
				div.removeAttribute("disabled")
				div.style.cursor = "pointer"
			}
			video.currentTime = 0;
			video.playbackRate = 1;
			video.play();
			recorder.start();
			video.onended = () => recorder.stop();
		}
	}
	return div
}


function speedButton(){
	let div = document.createElement("div")
	div.title = "Speed"
	Object.assign(div.style, {
		position: "relative",
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

	let area = document.createElement("div")
	Object.assign(area.style, {
		position: "absolute",
		visibility: "hidden",
		display: "flex",
		gap: "5px",
		alignItems: "center",
		top: 0,
		bottom: 0,
		left: 0,
		transform: "translateX(calc(-100% - 10px))",
		userSelect: "none",
	})

	let input = document.createElement("input")
	Object.assign(input, {
		type: "range",
		min: 1,
		max: 2,
		step: 0.25,
		value: currentSpeed,
	})
	input.style.cursor = "ew-resize"
	input.oninput = _=>{
		currentSpeed = input.value;
		text.innerHTML = currentSpeed;
		let video = getCurrent("video")
		if (video){
			video.playbackRate = currentSpeed;
		}
	}
	document.body.addEventListener("click", event=>{
		let path = event.path || (event.composedPath && event.composedPath());
		if (path.includes(area)){return}
		else if (path.includes(button)){
			area.style.visibility = area.style.visibility == "visible" ? "hidden" : "visible"
		} else {
			area.style.visibility = "hidden";
		}
	})

	let text = document.createElement("span")
	text.innerHTML = currentSpeed

	area.appendChild(text)
	area.appendChild(input)
	div.appendChild(area)

	onUrlChange(_=>{
		setTimeout(_=>{
			let video = getCurrent("video", 50)
			if (video){
				video.playbackRate = currentSpeed;
			}
		}, 250)
	})
	return div
}



function scrollInit(icon, direction){
	let div = document.createElement("div")
	div.title = direction > 0 ? "Next" : "Previous"
	div.innerHTML = icon
	Object.assign(div.style, {
		cursor: "pointer",
	})
	let container = document.querySelector("main > div")
	if (container){
		div.onclick = _=>{
			let amount = direction * container.clientHeight;
			container.scrollBy({
				top: amount,
				behavior: 'smooth'
			});
		}
	} else {
		console.error("Reels container not found!")
	}
	return div
}
function scrollUp(){
	return scrollInit(`
		<svg xmlns="http://www.w3.org/2000/svg" stroke="lightblue" stroke-width="1.5" fill="none" stroke-linecap="round" viewBox="0 0 24 24">
			<path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/>
			<path d="m8 13.78 2.87-3.06c.6-.67 1.66-.67 2.26 0L16 13.78"/>
		</svg>
	`, -1)
}
function scrollDown(){
	return scrollInit(`
		<svg xmlns="http://www.w3.org/2000/svg" stroke="lightblue" stroke-width="1.5" fill="none" stroke-linecap="round" viewBox="0 0 24 24">
			<path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/>
			<path d="m16 10.22-2.87 3.06a1.54 1.54 0 0 1-2.26 0L8 10.22"/>
		</svg>
	`, 1)
}


/* Helpers */
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
