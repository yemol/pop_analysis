import axios from 'axios'
import cheerio from 'cheerio'
import config from '../config'
import tools from './tools'

import fs from 'fs'
import path from 'path'
import request from 'request'

const cached = []
const savedPath = path.join(__dirname, '../../' + config.savePath + '_L')


// To download images from page
exports.start = () => {
	if (!fs.existsSync(savedPath)) {
		fs.mkdirSync(savedPath)
	}

	fs.readdir(path.join(__dirname, '../../' + config.savePath),function(err,files){
		if(err){
        console.log(err)
        return
    }
		files.forEach(function(filename){
			let imgName = filename.replace('.txt','.jpg')
			let downloadUrl = config.url + '/image/card/en/L_' + imgName + '?20170523a'
			let saved = path.join(savedPath, imgName)
			console.log('download image: ' + downloadUrl)
			// we will skip the image if it has been downloaded
			if (!fs.existsSync(saved)) {
				request.head(downloadUrl, () => {
					request(downloadUrl).pipe(fs.createWriteStream(saved))
				})
			}
		})
	})
}
