console.log('background script running ...')

const CHATGPT_URL = 'https://chatgpt.com/'

const checkOnGPT = async () => {
	let queryOptions = { active: true, currentWindow: true };
	let tabs = await chrome.tabs.query(queryOptions);
	let current_url = tabs[0].url
	return current_url.includes(CHATGPT_URL);
}

chrome.tabs.onUpdated.addListener(async (tabId) => {
	console.log('TAB UPDATED')
	if (!await checkOnGPT()) return
	console.log('this will only display if you are on chatgpt')
	chrome.scripting.executeScript({
		target: {tabId},
		files: ['/scripts/content-script.js']
	})
	
})