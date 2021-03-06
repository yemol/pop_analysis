import config from './config'
import axios from 'axios'
import tools from './lib/tools'
import bilibili from './lib/living/HeartBilibili'
import douyu from './lib/living/HeartDouyu'

let hasWarned = false
tools.log.info("Heartbeat is working!")
setInterval(function() {
	getData()
}, 60 * 1000);

function getData(){
	bilibili.start((result) => {
		tools.log.info(result)
		if (result === 1) {
			douyu.start((result) => {
				tools.log.info(result)
				if (result !== "1") {
					sendWarning("douyu_status_" + result)
				} else {
					tools.log.info("This loop is done.")
				}
			})
		} else {
			sendWarning("bilibili_status_" + result)
		}
	})
}

function sendWarning(message){
	tools.log.info("wanring")
	if (!hasWarned) {
		let url = config.sms.replace("[message]", message)
		let instance = axios.create({
			timeout: 100000
		})
		instance.get(url)
		.then(function (response) {
			if (response.status === 200) {
				hasWarned = true
				tools.log.info(response.data)
			}
		})
		.catch(function (err) {
			tools.log.error(err)
		})
	}
}
