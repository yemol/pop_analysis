import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "bilibili"
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
			for(let index in response.data.data.vlist){
				videos.push({
					"title": response.data.data.vlist[index].title,
					"play": response.data.data.vlist[index].play,
					"key": response.data.data.vlist[index].aid
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
