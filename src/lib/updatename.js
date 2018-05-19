import axios from 'axios'
import cheerio from 'cheerio'
import config from '../config'
import tools from './tools'

import fs from 'fs'
import path from 'path'
import request from 'request'


// To download images from page
exports.start = () => {
	fs.readdir('cardlist',function(err,files){
	    if(err){
	        console.log(err);
	        return;
	    }
			files.forEach(function(filename){
				if (filename.indexOf('Evolved') > 0){
					var newName = filename.substr(0,filename.lastIndexOf('_')-1)+'_Evolved'+'.png'
					fs.rename('cardlist/'+filename, 'cardlist/'+newName), (err) => {
						console.log(err)
					}
				} else {

				}
			})
	})
}
