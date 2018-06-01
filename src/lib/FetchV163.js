import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "163"
const DATA_TYPE = 1
const DETAIL_URL = "https://c.m.163.com/nc/video/detail/"
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
			var instance = axios.create({
				timeout: 100000,
				headers: {
					'User-Agent': config.UserAgent,
					'Accept-Language': 'zh-CN,zh;q=0.8',
					'Cookie': config.Cookie
				}
			})
			instance.get(one)
			.then(function (response) {
				let videos = []
				for (let index in response.data.tab_list){
					videos.push({
						"title": response.data.tab_list[index].title,
						"play": 0,
						"key": response.data.tab_list[index].skipID,
						"release": new Date(response.data.tab_list[index].lmodify),
						"cover": response.data.tab_list[index].imgsrc
					})
				}
				tools.log.info("item number is: " + videos.length)
				let index = null
				let processedCount = 0
				for (index in videos){
					fetchData(videos[index], (result) => {
						processedCount++
						if (processedCount === videos.length ){
							database.update(videos, DATA_FROM, DATA_TYPE)
							setTimeout(handleOneLink, config.heartbeat);
						}
					})
				}
			})
		}	catch (err){
			tools.log.error(err)
		}
	} else {
		if (back !== null )	back()
	}
}

function fetchData (item, callback) {
	let url = DETAIL_URL + item.key + ".html"
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
			item.play = response.data.playCount ? response.data.playCount : 0
			if (callback !== null )	callback(item)
		} else {
			callback(null)
		}
	})
	.catch(function (err) {
		tools.log.error(err)
		if (callback !== null )	callback()
	})
}
