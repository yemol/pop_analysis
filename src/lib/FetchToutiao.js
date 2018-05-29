import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "toutiao"
const DATA_TYPE = 1
// cache used to save all links of current site
let links = new CachedList()
// callback method used to return parent
let back = null
let maxBehotTime = ""

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
			let url = maxBehotTime > 0 ? one + "&max_behot_time=" + maxBehotTime : one
			console.log(maxBehotTime)
			// console.log(url)
			fetchData (url, (result, behotTime) => {
				maxBehotTime = behotTime
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
			let behotTime = ""
			let i = null
			for(i in response.data.data){
				videos.push({
					"title": response.data.data[i].title,
					"play": response.data.data[i].video_watch_count == null ? 0 : response.data.data[i].video_watch_count,
					"key": response.data.data[i].item_id,
					"cover": response.data.data[i].image_url
				})
			}
			behotTime = response.data.next.max_behot_time
			tools.log.info("item number is: " + videos.length)
			if (callback !== null )	callback(videos, behotTime)
		}
	})
	.catch(function (err) {
		tools.log.error(err)
		if (callback !== null )	callback()
	})
}
