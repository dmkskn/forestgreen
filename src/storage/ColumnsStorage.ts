

/**
 * A cache for the number of columns.
 */
export default class ColumnsStorage {
    static KEY = "columns"

    /**
     * Get the number of columns from the cache.
     */
    static get(defaultValue: number = 5): number {
        return Number(localStorage.getItem(this.KEY)) || defaultValue
    }

    /**
     * Set the number of columns in the cache.
     * @param {number} value - The new number of columns.
     */
    static set(value: number) {
        localStorage.setItem(this.KEY, String(value))
    }

    /**
     * Clears the cache for the number of columns.
     */
    static clear() {
        localStorage.removeItem(this.KEY)
    }
}