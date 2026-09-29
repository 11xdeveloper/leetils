import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { LfuCache } from ".";

/** A slow cache that scans every entry to find the one to evict. */
class ScanningCache {
	readonly entries = new Map<
		number,
		{ value: number; uses: number; lastUsed: number }
	>();
	time = 0;

	constructor(readonly capacity: number) {}

	get(key: number): number {
		const entry = this.entries.get(key);
		if (!entry) return -1;
		entry.uses++;
		entry.lastUsed = this.time++;
		return entry.value;
	}

	put(key: number, value: number): void {
		const entry = this.entries.get(key);
		if (entry) {
			Object.assign(entry, {
				value,
				uses: entry.uses + 1,
				lastUsed: this.time++,
			});
			return;
		}
		if (this.capacity === 0) return;
		if (this.entries.size === this.capacity) {
			const [victim] =
				[...this.entries].sort(
					([, a], [, b]) => a.uses - b.uses || a.lastUsed - b.lastUsed,
				)[0] ?? [];
			if (victim !== undefined) this.entries.delete(victim);
		}
		this.entries.set(key, { value, uses: 1, lastUsed: this.time++ });
	}
}

describe("460. LFU Cache", () => {
	it("solves the example from the problem statement", () => {
		const cache = new LfuCache(2);
		cache.put(1, 1);
		cache.put(2, 2);
		expect(cache.get(1)).toBe(1);
		cache.put(3, 3);
		expect(cache.get(2)).toBe(-1);
		expect(cache.get(3)).toBe(3);
		cache.put(4, 4);
		expect(cache.get(1)).toBe(-1);
		expect(cache.get(3)).toBe(3);
		expect(cache.get(4)).toBe(4);
	});

	it("matches a cache that scans for the entry to evict", () => {
		const random = createRandom(460);
		for (let run = 0; run < 200; run++) {
			const capacity = random.int(0, 4);
			const cache = new LfuCache(capacity);
			const reference = new ScanningCache(capacity);
			for (let op = 0; op < 60; op++) {
				const key = random.int(0, 6);
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
