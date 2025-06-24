var browser = chrome || browser;
var onUrlChange = urlObserver()
var currentSpeed = 1
var Settings = {}
browser.storage.sync.get({
	download: true,
	downloader: "build-in",
	speed: true,
	navigation: true,
}, results => { Settings = results; })
window.onload = _=> {
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
			right: "10px",
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
		if (Settings.navigation){
			mainMenu.appendChild(scrollButton("up"))
		}
		if (Settings.download){
			mainMenu.appendChild(downloadButton(Settings.downloader))
		}
		if (Settings.speed){
			mainMenu.appendChild(speedButton())
		}
		if (Settings.navigation){
			mainMenu.appendChild(scrollButton("down"))
		}
	}
}
