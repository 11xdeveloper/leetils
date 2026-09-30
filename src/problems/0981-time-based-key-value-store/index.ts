/**
 * 981. Time Based Key-Value Store
 *
 * Stores values under keys at timestamps (strictly increasing per key).
 * `get(key, timestamp)` returns the value set most recently at or before
 * `timestamp`, or `""` if there's none.
 *
 * Keeps each key's history in timestamp order, so a lookup is a binary
 * search for the last timestamp not after the query.
 *
 * @see https://leetcode.com/problems/time-based-key-value-store/
 * @difficulty Medium
 * @timeComplexity O(1) per set, O(log n) per get
 * @spaceComplexity O(n)
 *
 * @example
 * const store = new TimeBasedKeyValueStore();
 * store.set("foo", "bar", 1);
 * store.get("foo", 3); // "bar"
 */
export class TimeBasedKeyValueStore {
	readonly #history = new Map<string, [timestamp: number, value: string][]>();

	set(key: string, value: string, timestamp: number): void {
		const entries = this.#history.get(key);
		if (entries) entries.push([timestamp, value]);
		else this.#history.set(key, [[timestamp, value]]);
	}

	get(key: string, timestamp: number): string {
		const entries = this.#history.get(key) ?? [];
		let low = 0;
		let high = entries.length;
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((entries[mid]?.[0] ?? 0) <= timestamp) low = mid + 1;
			else high = mid;
		}
		return entries[low - 1]?.[1] ?? "";
	}
}
