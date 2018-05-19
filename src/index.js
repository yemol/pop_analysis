import base from './lib/base'
import image from './lib/image'
import namedImg from './lib/namedImg'
import updatename from './lib/updatename'
import downloadImg from './lib/downloadImg'
import config from './config'

// base.start(config.url + config.path, (item) => {
// 	// image.start(item)
// 	updatename.start(item)
// 	// namedImg.start()
// })


downloadImg.start()
