import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "youku"
const DATA_TYPE = 1
// cache used to save all links of current site
let links = new CachedList()
// callback method used to return parent
let back = null
let search_for = null

exports.add = (oneLink) => {
	links.push(oneLink)
}

exports.start = (searchfor, callback) => {
	back = callback
	search_for = searchfor
	handleOneLink()
}

function handleOneLink () {
	let one = links.pop()
	if (one !== null) {
		try{
			//Handle one link and get data
			fetchData (one, (result) => {
				database.update(result, DATA_FROM, DATA_TYPE)
				setTimeout(handleOneLink, config.heartbeat);
			})
		}	catch (err){
			tools.log.error(err)
		}
	} else {
		if (back !== null )	back()
	}
}

function getKey(url) {
	url = url.substr(url.lastIndexOf('/') + 1)
	url = url.substr(0, url.lastIndexOf('.'))
	return url
}

function fetchData (url, callback) {
	tools.log.info("Searching url -> " + url)
	var instance = axios.create({
		timeout: 100000,
		headers: {
			'User-Agent': config.UserAgent,
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Cookie': config.Cookie
		}
	})
	instance.get(url)
	.then(function (response) {
		if (response.status === 200) {
			let videos = []
			let $ = cheerio.load(response.data)
			$(search_for).each((index, element) => {
				videos.push({
					"title": $(element).find("div.v-meta-title a").attr("title"),
					"play": tools.formatNum($(element).find("span.v-num").text()),
					"key": getKey($(element).find("div.v-meta-title a").attr("href")),
					"cover": $(element).find("div.v-thumb img").attr("src")
				})
			})
			tools.log.info("item number is: " + videos.length)
			if (callback !== null )	callback(videos)
		}
	})
	.catch(function (error) {
		tools.log.error(error)
		if (callback !== null )	callback()
	})
}
