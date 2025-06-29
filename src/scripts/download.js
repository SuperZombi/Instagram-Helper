function downloadButton(downloader){
	let div = document.createElement("div")
	div.title = browser.i18n.getMessage("downloadTitle")
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
		if (downloader == "build-in"){
			build_in_downloader(div)
		}
	}
	return div
}

function build_in_downloader(div){
	if (!div.getAttribute("disabled")){
		div.setAttribute("disabled", true)
		div.style.cursor = "wait"
		let video = getCurrent("video")
		if (!video){return}
		let stream = video.captureStream ? video.captureStream() : video.mozCaptureStream()
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
