import config from './config'
import tools from './lib/tools'
import database from './lib/Database'
import bilibili from './lib/living/GetBilibili'
import douyu from './lib/living/GetDouyu'
import huya from './lib/living/GetHuya'

let p_bilibili, p_douyu, p_huya = 0

bilibili.start((result) => {
	p_bilibili = result
	douyu.start((result) => {
		p_douyu = result
		huya.start((result) => {
			p_huya = result
			database.addLivingInfo(p_bilibili, p_douyu, p_huya)
		})
	})
})
