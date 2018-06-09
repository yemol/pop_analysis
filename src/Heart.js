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
		if (result) {
			douyu.start((result) => {
				tools.log.info(result)
				if (!result) {
					sendWarning()
				} else {
					tools.log.info("This loop is done.")
				}
			})
		} else {
			sendWarning()
		}
	})
}

function sendWarning(){
	tools.log.info("wanring")
	if (!hasWarned) {
		let url = config.sms
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
