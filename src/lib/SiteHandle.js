import tools from './tools'
import config from '../config'
import CachedList from './CachedList'
import f_bilibili from './FetchBilibili'
import f_douyu from './FetchDouyu'
import f_huya from './FetchHuya'
import f_youku from './FetchYouku'
import f_qq from './FetchQQ'
import f_aiqiyi from './FetchAiqiyi'
import f_v163 from './FetchV163'
import f_sohu from './FetchSohu'
import f_toutiao from './FetchToutiao'
import f_baidu from './FetchBaidu'

// cache used to save settings of all sites
let sites = new CachedList()
// callback method used to return parent
let back = null

exports.add = (settings) => {
	sites.push(settings)
}

exports.start = (callback) => {
	back = callback
	handleOneSite ()
}

function handleOneSite () {
	let one = sites.pop()
	if (one !== null) {
		tools.log.info("Processing site: " + one.name)
		switch (one.name) {
			case "Bilibili":
				bilibiliHandle(one)
				break;
			case "douyu":
				douyuHandle(one)
				break;
			case "huya":
				huyaHandle(one)
				break;
			case "youku_o":
			case "youku_d":
				youkuHandle(one)
				break;
			case "qq_o":
			case "qq_d":
				qqHandle(one)
				break;
			case "aiqiyi":
				aiqiyiHandle(one)
				break;
			case "163":
				v163Handle(one)
				break;
			case "sohu":
				sohuHandle(one)
				break;
			case "toutiao":
				toutiaoHandle(one)
				break;
			case "baidu":
				baiduHandle(one)
				break;
			default:
				// We will loop to next one if we cannot find its handle.
				tools.log.warning("Site: " + one.name + " is not been handled!")
				setTimeout(handleOneSite, config.heartbeat);
				break;
		}
	} else {
		// all sites are done. we need to call callback method to send out notification.
		if (back !== null )	back()
	}
}

function baiduHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_baidu.add(one.links[index])
	}
	// start checking links
	f_baidu.start(one.cookie, (result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function toutiaoHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_toutiao.add(one.links[index])
	}
	// start checking links
	f_toutiao.start((result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function sohuHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_sohu.add(one.links[index])
	}
	// start checking links
	f_sohu.start(one.cookie, (result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function v163Handle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_v163.add(one.links[index])
	}
	// start checking links
	f_v163.start((result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function aiqiyiHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_aiqiyi.add(one.links[index])
	}
	// start checking links
	f_aiqiyi.start((result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function qqHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_qq.add(one.links[index])
	}
	// start checking links
	f_qq.start((result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function youkuHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_youku.add(one.links[index])
	}
	// start checking links
	f_youku.start(one.searchFor, (result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function bilibiliHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_bilibili.add(one.links[index])
	}
	// start checking links
	f_bilibili.start((result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function douyuHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_douyu.add(one.links[index])
	}
	// start checking links
	f_douyu.start((result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}

function huyaHandle(one){
	// save all links under this site that we need to check
	for (let index in one.links) {
			f_huya.add(one.links[index])
	}
	// start checking links
	f_huya.start(one.searchFor, (result) => {
		// next one
		setTimeout(handleOneSite, config.heartbeat);
	})
}
