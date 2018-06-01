import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "aiqiyi"
const DATA_TYPE = 1
// cache used to save all links of current site
let links = new CachedList()
// callback method used to return parent
let back = null
let lastfeedId = ""

exports.add = (oneLink) => {
	links.push(oneLink)
}

exports.start = (callback) => {
	back = callback
	handleOneLink()
}

function handleOneLink () {
	let one = links.pop()
	if (one !== null) {
		try{
			//Handle one link and get data
			fetchData (one+ "&feedId=" + lastfeedId, (result, feedId) => {
				lastfeedId = feedId
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

function getdate(src) {
	let mark = src.indexOf("image/")
	let dateStr = src.substr(mark+6, src.length - (mark+6))
	mark = dateStr.indexOf("/")
	dateStr = dateStr.substr(0, mark)
	return new Date(dateStr.substr(0,4)*1 + "-" + dateStr.substr(4,2)*1 + "-" + dateStr.substr(6,2)*1)
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
			let feedId = ""
			let i = null
			for(i in response.data.data.feeds){
				if (response.data.data.feeds[i].tvTitle.length > 0 ){
					videos.push({
						"title":response.data.data.feeds[i].tvTitle,
						"play": response.data.data.feeds[i].playCount,
						"key": getKey(response.data.data.feeds[i].videoPlayUrl),
						"release": getdate(response.data.data.feeds[i].thumbnail),
						"cover": response.data.data.feeds[i].thumbnail
					})
					feedId = response.data.data.feeds[i].feedId
				}
			}
			tools.log.info("item number is: " + videos.length)
			if (callback !== null )	callback(videos, feedId)
		}
	})
	.catch(function (err) {
		tools.log.error(err)
		if (callback !== null )	callback()
	})
}
