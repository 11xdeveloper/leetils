interface Bucket {
	count: number;
	keys: Set<string>;
	prev: Bucket;
	next: Bucket;
}

/**
 * 432. All O`one Data Structure
 *
 * Counts strings, supporting increment, decrement, and finding a key with
 * the highest or lowest count, all in O(1) time.
 *
 * Keeps a doubly linked list of buckets in increasing count order, each
 * holding the keys with that count, between two sentinel buckets. A key
 * moves only to the neighbouring bucket (creating it if needed), so every
 * operation touches a constant number of buckets, and the smallest and
 * largest counts are at the ends of the list.
 *
 * @see https://leetcode.com/problems/all-oone-data-structure/
 * @difficulty Hard
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const counts = new AllOoneDataStructure();
 * counts.inc("hello");
 * counts.inc("hello");
 * counts.inc("leet");
 * counts.getMaxKey(); // "hello"
 * counts.getMinKey(); // "leet"
 */
export class AllOoneDataStructure {
	readonly #head: Bucket;
	readonly #tail: Bucket;
	readonly #bucketOf = new Map<string, Bucket>();

	constructor() {
		const head = { count: 0, keys: new Set<string>() } as Bucket;
		const tail = {
			count: Number.POSITIVE_INFINITY,
			keys: new Set<string>(),
		} as Bucket;
		head.prev = head;
		head.next = tail;
		tail.prev = head;
		tail.next = tail;
		this.#head = head;
		this.#tail = tail;
	}

	/** Adds one to `key`'s count, adding it with a count of 1 if new. */
	inc(key: string): void {
		const current = this.#bucketOf.get(key) ?? this.#head;
		let next = current.next;
		if (next.count !== current.count + 1)
			next = this.#insertAfter(current, current.count + 1);
		next.keys.add(key);
		this.#bucketOf.set(key, next);
		this.#leave(current, key);
	}

	/** Subtracts one from `key`'s count, removing it at 0. The key must exist. */
	dec(key: string): void {
		const current = this.#bucketOf.get(key);
		if (!current) return;
		if (current.count === 1) {
			this.#bucketOf.delete(key);
		} else {
			let previous = current.prev;
			if (previous.count !== current.count - 1)
				previous = this.#insertAfter(current.prev, current.count - 1);
			previous.keys.add(key);
			this.#bucketOf.set(key, previous);
		}
		this.#leave(current, key);
	}

	/** A key with the highest count, or `""` if there are none. */
	getMaxKey(): string {
		return this.#firstKey(this.#tail.prev);
	}

	/** A key with the lowest count, or `""` if there are none. */
	getMinKey(): string {
		return this.#firstKey(this.#head.next);
	}

	#firstKey(bucket: Bucket): string {
		const first = bucket.keys.values().next();
		return first.done ? "" : first.value;
	}

	#insertAfter(bucket: Bucket, count: number): Bucket {
		const inserted: Bucket = {
			count,
			keys: new Set(),
			prev: bucket,
			next: bucket.next,
		};
		bucket.next.prev = inserted;
		bucket.next = inserted;
		return inserted;
	}

	/** Removes `key` from `bucket`, unlinking the bucket if it's now empty. */
	#leave(bucket: Bucket, key: string): void {
		if (bucket === this.#head) return;
		bucket.keys.delete(key);
		if (bucket.keys.size > 0) return;
		bucket.prev.next = bucket.next;
		bucket.next.prev = bucket.prev;
	}
}
