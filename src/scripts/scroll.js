function scrollButton(direction){
	let div = document.createElement("div")
	Object.assign(div.style, {
		cursor: "pointer",
	})
	if (direction === "up"){
		div.title = "Previous"
		div.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" stroke="lightblue" stroke-width="1.5" fill="none" stroke-linecap="round" viewBox="0 0 24 24">
				<path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/>
				<path d="m8 13.78 2.87-3.06c.6-.67 1.66-.67 2.26 0L16 13.78"/>
			</svg>
		`
	}
	else if (direction === "down"){
		div.title = "Next"
		div.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" stroke="lightblue" stroke-width="1.5" fill="none" stroke-linecap="round" viewBox="0 0 24 24">
				<path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/>
				<path d="m16 10.22-2.87 3.06a1.54 1.54 0 0 1-2.26 0L8 10.22"/>
			</svg>
		`
	} else { console.error(`Wrong direction: ${direction}`) }
	let container = document.querySelector("main > div")
	if (container){
		div.onclick = _=>{
			let neighbours = getNeighbours("video")
			if (direction === "up" && neighbours.previous){
				neighbours.previous.scrollIntoView({
					behavior: 'smooth',
					block: "end"
				})
			}
			else if (direction === "down" && neighbours.next){
				neighbours.next.scrollIntoView({
					behavior: 'smooth',
					block: "end"
				})
			}
			else {
				console.log("Neighbours not found!")
			}
		}
	} else {
		console.error("Reels container not found!")
	}
	return div
}
