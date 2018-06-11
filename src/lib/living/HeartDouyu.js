import axios from 'axios'
import cheerio from 'cheerio'
import database from '../Database'
import tools from '../tools'
import CachedList from '../CachedList'
import config from '../../config'

// basic info this module
const DATA_FROM = "douyu"
const DATA_TYPE = 1
// cache used to save all links of current site
let links = new CachedList()
// callback method used to return parent
let back = null
let checkURL = "http://open.douyucdn.cn/api/RoomApi/room/125"

exports.start = (callback) => {
	back = callback
	handleOneLink()
}

function handleOneLink () {
	try{
		//Handle one link and get data
		fetchData ((result) => {
			if (back !== null) back(result)
		})
	}	catch (err){
		tools.log.error(err)
	}
}

function fetchData (callback) {
	var instance = axios.create({
		timeout: 100000,
		headers: {
			'User-Agent': config.UserAgent,
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Cookie': config.Cookie
		}
	})
	instance.get(checkURL)
	.then(function (response) {
		if (response.status === 200) {
			if (callback !== null )	callback(response.data.data.room_status)
		}
	})
	.catch(function (err) {
		tools.log.error(err)
		if (callback !== null )	callback()
	})
}
