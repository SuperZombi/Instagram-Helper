var browser = chrome || browser;

browser.storage.sync.get({
	download: true,
	downloader: "build-in",
	speed: true,
	navigation: true,
}, results => {
	Object.entries(results).forEach(([key,val])=>{
		let el = document.querySelector(`.setting[name="${key}"]`)
		if (el){
			if (el.type == "checkbox"){
				el.checked = val
			}
			else {
				el.value = val
			}
		} else {
			console.warn(`Element ${key} not found!`)
		}
	})
})

document.querySelector("#save").onclick = _=>{
	let settings = {}
	document.querySelectorAll(".setting").forEach(set=>{
		if (set.type == "checkbox"){
			settings[set.name] = set.checked
		}
		else{
			settings[set.name] = set.value
		}
	})
	browser.storage.sync.set({
		...settings
		}, _ => {
		browser.runtime.reload();
		window.close();
	});
}
