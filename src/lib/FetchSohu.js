import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "sohu"
const DATA_TYPE = 1
const DETAIL_URL = "https://vstat.v.blog.sohu.com/dostat.do?method=getVideoPlayCount&v="
// cache used to save all links of current site
let links = new CachedList()
// callback method used to return parent
let back = null
let processedCount = 0

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
			fetchData (one, (result, ids) => {
				// get visited count info
				fetchCount (result, ids, (result) => {
					console.log(result.length)
					database.update(result, DATA_FROM, DATA_TYPE)
					setTimeout(handleOneLink, config.heartbeat);
				})
			})
		}	catch (err){
			tools.log.error(err)
		}
	} else {
		if (back !== null )	back()
	}
}

function fetchCount (videos, ids, callback) {
	let url = DETAIL_URL + ids.substr(0, ids.length -1) + "&n=c"
	// tools.log.info("Searching url -> " + url)
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
			// return format is a json call, we have to convert it to a json object
			let data = response.data.replace("var c=","")
			data = data.replace(";","")
			data = JSON.parse(data)
			let i = null
			for(i in data){
				let j = null
				for(j in videos){
					if (data[i].id == videos[j].key){
						videos[j].play = data[i].count
						break
					}
				}
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
			let ids = ""
			for(let index in response.data.data.list){
				videos.push({
					"title": response.data.data.list[index].title,
					"play": 0,
					"key": response.data.data.list[index].id,
					"cover": response.data.data.list[index].smallCover
				})
				ids += response.data.data.list[index].id + "|"
			}
			tools.log.info("item number is: " + videos.length)
			if (callback !== null )	callback(videos, ids)
		}
	})
	.catch(function (err) {
		tools.log.error(err)
		if (callback !== null )	callback()
	})
}
