import { History } from "../types/History"


/**
 * A cache for the history.
 */
export default class HistoryStorage {
	static KEY = "history"

	/**
	 * Get the the last used colors from the cache.
	 */
	static get(): History {
		const data = localStorage.getItem(this.KEY)

		if (data) {
			return JSON.parse(data)
		} else {
			return []
		}
	}

	/**
	 * Set all the history of the last used colors in the cache.
	 * @param {History} value - The new number of columns.
	 */
	static set(value: History) {
		localStorage.setItem(this.KEY, JSON.stringify(value))
	}

	/**
	 * Clears the cache for the history of the last used colors.
	 */
	static clear() {
		localStorage.removeItem(this.KEY)
	}
}