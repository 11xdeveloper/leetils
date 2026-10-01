/**
 * 146. LRU Cache
 *
 * A key–value cache with a fixed capacity that evicts the least recently
 * used key when a new key doesn't fit. Reading or writing a key makes it the
 * most recently used.
 *
 * A `Map` iterates its keys in insertion order, so deleting and re-inserting
 * a key on each use keeps the keys ordered from least to most recently used.
 * The least recently used key is then always the first. Every operation is
 * O(1).
 *
 * @see https://leetcode.com/problems/lru-cache/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(capacity)
 *
 * @example
 * const cache = new LruCache(2);
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1); // 1
 * cache.put(3, 3); // evicts key 2
 * cache.get(2); // -1
 */
export class LruCache {
	readonly #capacity: number;
	readonly #entries = new Map<number, number>();

	constructor(capacity: number) {
		this.#capacity = capacity;
	}

	/** Returns the value for `key`, or -1 if it isn't cached. */
	get(key: number): number {
		const value = this.#entries.get(key);
		if (value === undefined) return -1;
		this.#entries.delete(key);
		this.#entries.set(key, value);
		return value;
	}

	/** Sets the value for `key`, evicting the least recently used key if the cache is full. */
	put(key: number, value: number): void {
		this.#entries.delete(key);
		this.#entries.set(key, value);
		if (this.#entries.size > this.#capacity) {
			const leastRecent = this.#entries.keys().next();
			if (!leastRecent.done) this.#entries.delete(leastRecent.value);
		}
	}
}
