import axios from 'axios'
import cheerio from 'cheerio'
import database from './Database'
import tools from './tools'
import CachedList from './CachedList'
import config from '../config'

// basic info this module
const DATA_FROM = "baidu"
const DATA_TYPE = 1
// cache used to save all links of current site
let links = new CachedList()
// callback method used to return parent
let back = null
let myCookie = null

exports.add = (oneLink) => {
	links.push(oneLink)
}

exports.start = (cookie, callback) => {
	back = callback
	myCookie = cookie
	handleOneLink()
}

function handleOneLink () {
	let one = links.pop()
	if (one !== null) {
		try{
			//Handle one link and get data
			fetchData (one, (result) => {
				// console.log(result)
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
			'Cookie': myCookie
		}
	})
	instance.get(url)
	.then(function (response) {
		if (response.status === 200) {
			let videos = []
			let index = null
			for(index in response.data.data.items){
				if (response.data.data.items[index].type === "video") {
					videos.push({
						"title": response.data.data.items[index].title,
						"play": response.data.data.items[index].read_amount,
						"key": response.data.data.items[index].article_id,
						"release": new Date(response.data.data.items[index].created_at*1000),
						"cover": response.data.data.items[index].cover_images == undefined ? null:response.data.data.items[index].cover_images[0].src
					})
				}
			}
			tools.log.info("item number is: " + videos.length)
			if (callback !== null )	callback(videos)
		} else {
			tools.log.info("response is incorrect and code is : " + response.status)
		}
	})
	.catch(function (err) {
		tools.log.error(err)
		if (callback !== null )	callback()
	})
}
