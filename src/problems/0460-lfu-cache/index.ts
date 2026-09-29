/**
 * 460. LFU Cache
 *
 * A key-value cache holding at most `capacity` entries. When full, adding a
 * new key evicts the least frequently used key, where a use is a `get` or
 * `put` of it; ties go to the least recently used. Both operations run in
 * constant time.
 *
 * Keeps each key's value and use count, plus, for each count, a `Set` of
 * the keys with that count. A `Set` remembers insertion order, so its first
 * key is the least recently used. It also tracks the smallest count, which
 * only changes when its set empties (to the next count up) or a new key
 * arrives (back to 1).
 *
 * @see https://leetcode.com/problems/lfu-cache/
 * @difficulty Hard
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(capacity)
 *
 * @example
 * const cache = new LfuCache(2);
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1); // 1
 * cache.put(3, 3); // evicts 2, which was used less than 1
 * cache.get(2); // -1
 */
export class LfuCache {
	readonly #capacity: number;
	readonly #entries = new Map<number, { value: number; uses: number }>();
	readonly #keysByUses = new Map<number, Set<number>>();
	#minUses = 0;

	constructor(capacity: number) {
		this.#capacity = capacity;
	}

	get(key: number): number {
		const entry = this.#entries.get(key);
		if (!entry) return -1;
		this.#use(key, entry);
		return entry.value;
	}

	put(key: number, value: number): void {
		const entry = this.#entries.get(key);
		if (entry) {
			entry.value = value;
			this.#use(key, entry);
			return;
		}
		if (this.#capacity === 0) return;

		if (this.#entries.size === this.#capacity) {
			const leastUsed = this.#keysByUses.get(this.#minUses);
			const [evicted] = leastUsed ?? [];
			if (evicted !== undefined) {
				leastUsed?.delete(evicted);
				this.#entries.delete(evicted);
			}
		}

		this.#entries.set(key, { value, uses: 1 });
		this.#keysAt(1).add(key);
		this.#minUses = 1;
	}

	#use(key: number, entry: { uses: number }): void {
		const keys = this.#keysByUses.get(entry.uses);
		keys?.delete(key);
		if (keys?.size === 0) {
			this.#keysByUses.delete(entry.uses);
			if (this.#minUses === entry.uses) this.#minUses++;
		}
		entry.uses++;
		this.#keysAt(entry.uses).add(key);
	}

	#keysAt(uses: number): Set<number> {
		let keys = this.#keysByUses.get(uses);
		if (!keys) {
			keys = new Set();
			this.#keysByUses.set(uses, keys);
		}
		return keys;
	}
}
