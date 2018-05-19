import axios from 'axios'
import cheerio from 'cheerio'
import config from '../config'
import tools from './tools'

import fs from 'fs'
import path from 'path'
import request from 'request'

// images that we need to download
const savedPath = path.join(__dirname, '../../' + config.savePath)

function downloadImage (id) {
	let current = "https://shadowverse-portal.com/image/card/en/L_" + id + ".jpg?20170731b"
	// format of filename will be id_name.png
	let fileName = "" + id + ".jpg"
	fileName = path.join(savedPath, fileName)
	if (!fs.existsSync(savedPath)) {
		fs.mkdirSync(savedPath)
	}

	// we will skip the image if it has been downloaded
	if (fs.existsSync(fileName)) { return }
	// start downloading image
	request.head(current, () => {
		request(current).pipe(fs.createWriteStream(fileName))
		console.log('download image: ' + current)
	})
}

// To download images from page
exports.start = () => {
	console.log('get images')
	fs.readFile(path.join(savedPath, 'shadowverse_card.txt'),'utf-8',function(err,data){
    if(err){
      console.error(err);
    }
    else{
			// start geting id list
			let ids = data.split('\r\n')
			for (let i = 0 ; i < ids.length; i++){
				if (ids[i].length > 4){
					ids[i] = ids[i].substr(1,9)
					downloadImage(ids[i])
				}
			}
    }
});
}
