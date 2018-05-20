import Log from 'log'
import config from '../config'

const log = new Log(config.log)
exports.log = log

exports.contains = (arr, obj) => {
	var i = arr.length
	while (i--) {
		if (arr[i] === obj) {
			return true
		}
	}
	return false
}

exports.partlyContains = (arr, obj) => {
	if (obj === undefined) return false
	var i = arr.length
	while (i--) {
		if (obj.indexOf(arr[i]) >= 0) {
			return true
		}
	}
	return false
}

exports.formatNum = (num) => {
	num = num.replace(/\r/g, "")
	num = num.replace(/\t/g, "")
	num = num.replace(/\n/g, "")
	num = num.replace(/,/g, "")
	return num*1
}
