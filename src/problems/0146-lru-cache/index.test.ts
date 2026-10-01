import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { LruCache } from ".";

/** Keeps entries in an array ordered from least to most recently used. */
class ArrayCache {
	readonly entries: [number, number][] = [];
	constructor(readonly capacity: number) {}
	get(key: number): number {
		const i = this.entries.findIndex(([k]) => k === key);
		if (i === -1) return -1;
		const [entry] = this.entries.splice(i, 1);
		if (entry) this.entries.push(entry);
		return entry?.[1] ?? -1;
	}
	put(key: number, value: number): void {
		const i = this.entries.findIndex(([k]) => k === key);
		if (i !== -1) this.entries.splice(i, 1);
		this.entries.push([key, value]);
		if (this.entries.length > this.capacity) this.entries.shift();
	}
}

describe("146. LRU Cache", () => {
	it("solves the example from the problem statement", () => {
		const cache = new LruCache(2);
		cache.put(1, 1);
		cache.put(2, 2);
		expect(cache.get(1)).toBe(1);
		cache.put(3, 3);
		expect(cache.get(2)).toBe(-1);
		cache.put(4, 4);
		expect(cache.get(1)).toBe(-1);
		expect(cache.get(3)).toBe(3);
		expect(cache.get(4)).toBe(4);
	});

	it("counts updating a key as using it", () => {
		const cache = new LruCache(2);
		cache.put(1, 1);
		cache.put(2, 2);
		cache.put(1, 10);
		cache.put(3, 3);
		expect(cache.get(1)).toBe(10);
		expect(cache.get(2)).toBe(-1);
	});

	it("handles a capacity of one", () => {
		const cache = new LruCache(1);
		cache.put(2, 1);
		expect(cache.get(2)).toBe(1);
		cache.put(3, 2);
		expect(cache.get(2)).toBe(-1);
		expect(cache.get(3)).toBe(2);
	});

	it("matches an array-based cache on random operations", () => {
		const random = createRandom(146);
		for (let run = 0; run < 100; run++) {
			const capacity = random.int(1, 5);
			const cache = new LruCache(capacity);
			const reference = new ArrayCache(capacity);
			for (let step = 0; step < 100; step++) {
				const key = random.int(0, 8);
				if (random.int(0, 1) === 0) {
					expect(cache.get(key)).toBe(reference.get(key));
				} else {
					const value = random.int(0, 100);
					cache.put(key, value);
					reference.put(key, value);
				}
			}
		}
	});
});
