/**
 * 2622. Cache With Time Limit
 *
 * A key-value cache where each entry expires `duration` milliseconds after
 * it was set. `set` returns whether an unexpired entry was overwritten, `get`
 * returns the value or -1, and `count` returns the number of unexpired
 * entries. Pass a clock, like `Date.now` (the default), to control time.
 *
 * Store each value with its expiry time, and treat expired entries as
 * missing, deleting them as they're found.
 *
 * @see https://leetcode.com/problems/cache-with-time-limit/
 * @difficulty Medium
 * @timeComplexity O(1) for `set` and `get`, O(n) for `count`
 * @spaceComplexity O(n)
 *
 * @example
 * const cache = new CacheWithTimeLimit();
 * cache.set(1, 42, 1000); // false
 * cache.get(1); // 42
 * cache.count(); // 1
 */
export class CacheWithTimeLimit {
	readonly #entries = new Map<number, [value: number, expiry: number]>();
	readonly #now: () => number;

	constructor(now: () => number = Date.now) {
		this.#now = now;
	}

	set(key: number, value: number, duration: number): boolean {
		const existed = this.get(key) !== -1;
		this.#entries.set(key, [value, this.#now() + duration]);
		return existed;
	}

	get(key: number): number {
		const entry = this.#entries.get(key);
		if (!entry) return -1;
		if (entry[1] <= this.#now()) {
			this.#entries.delete(key);
			return -1;
		}
		return entry[0];
	}

	count(): number {
		const now = this.#now();
		for (const [key, [, expiry]] of this.#entries)
			if (expiry <= now) this.#entries.delete(key);
		return this.#entries.size;
	}
}
