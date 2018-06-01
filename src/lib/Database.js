import config from '../config'
import mysql from 'mysql'

// items an array with title, play and key
exports.update = (items, from, type) => {
	let connection = mysql.createConnection({
	  host     : config.mysql.host,
	  user     : config.mysql.username,
	  password : config.mysql.password,
	  database : config.mysql.database
	})
	connection.connect()
	for (let index in items) {
		connection.query('call updateInfo(?,?,?,?,?,?,?);',[from, type, items[index].title, items[index].play, items[index].cover, items[index].key, items[index].release], function (error, results, fields) {
			// error handle
			if (error) throw error
		})
	}
	connection.end()
}


// items an array with title, play and key
exports.addLivingInfo = (pBilibili, pDouyu, pHuya) => {
	let connection = mysql.createConnection({
	  host     : config.mysql.host,
	  user     : config.mysql.username,
	  password : config.mysql.password,
	  database : config.mysql.database
	})
	connection.connect()
	connection.query('call addLivingInfo(?,?,?);',[pBilibili, pDouyu, pHuya], function (error, results, fields) {
		if (error) throw error
	})
	connection.end()
}
