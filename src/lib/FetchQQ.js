import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "qq"
const DATA_TYPE = 1
// cache used to save all links of current site
let links = new CachedList()
// callback method used to return parent
let back = null

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

function getDate(datetime) {
	if(datetime.indexOf("小时前") > 0) {
		datetime = datetime.replace("小时前","")*1
		console.log(new Date(new Date() - datetime*60*60*1000))
		return new Date(new Date() - datetime*60*60*1000)
	} else {
		return new Date(datetime)
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
			let QZOutputJson = null
			eval(response.data)
			let videos = []
			let index = null
			for(index in QZOutputJson.videolst){
				videos.push({
					"title": QZOutputJson.videolst[index].title,
					"play": QZOutputJson.videolst[index].play_count,
					"key": QZOutputJson.videolst[index].vid,
					"release": getDate(QZOutputJson.videolst[index].uploadtime),
					"cover": QZOutputJson.videolst[index].pic
				})
			}
			tools.log.info("item number is: " + videos.length)
			if (callback !== null )	callback(videos)
		}
	})
	.catch(function (err) {
		tools.log.error(err)
		if (callback !== null )	callback()
	})
}
