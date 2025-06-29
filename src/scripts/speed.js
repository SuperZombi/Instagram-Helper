function speedButton(){
	let div = document.createElement("div")
	div.title = browser.i18n.getMessage("speed")
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
		text.textContent = currentSpeed;
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
	text.textContent = currentSpeed

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
