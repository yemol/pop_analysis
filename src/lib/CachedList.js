
export default class CachedList {
	constructor () {
		// this is a internal cache used to save items
		// we will watch on this list with certain loop to check if there is new item in it
		this.savedList = []
	}

	getCapacity () {
		return this.savedList.length
	}

	isEmpty () {
		return this.savedList.length === 0
	}

	push (item) {
		this.savedList.unshift(item)
	}

	pop () {
		return this.savedList.length === 0 ? null : this.savedList.pop()
	}
}
