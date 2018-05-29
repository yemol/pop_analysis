import config from './config'
import tools from './lib/tools'
import database from './lib/Database'
import bilibili from './lib/living/GetBilibili'
import douyu from './lib/living/GetDouyu'
import huya from './lib/living/GetHuya'

let p_bilibili, p_douyu, p_huya = 0

// lving will be recorded every 10 mins.
setInterval(function() {
	getData()
	console.log("living recorded!")
}, config.living * 60 * 1000);

function getData(){
	bilibili.start((result) => {
		p_bilibili = result
		if (isNaN(p_bilibili)) {
			getData()
			return
		}
		douyu.start((result) => {
			p_douyu = result
			if (isNaN(p_douyu)) {
				getData()
				return
			}
			huya.start((result) => {
				p_huya = result
				if (isNaN(p_huya)) {
					getData()
					return
				}
				database.addLivingInfo(p_bilibili, p_douyu, p_huya)
			})
		})
	})
}
