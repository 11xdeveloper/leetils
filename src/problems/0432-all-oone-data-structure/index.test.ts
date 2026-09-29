import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { AllOoneDataStructure } from ".";

describe("432. All O`one Data Structure", () => {
	it("solves the example from the problem statement", () => {
		const counts = new AllOoneDataStructure();
		counts.inc("hello");
		counts.inc("hello");
		expect(counts.getMaxKey()).toBe("hello");
		expect(counts.getMinKey()).toBe("hello");
		counts.inc("leet");
		expect(counts.getMaxKey()).toBe("hello");
		expect(counts.getMinKey()).toBe("leet");
	});

	it("returns empty strings when there are no keys", () => {
		const counts = new AllOoneDataStructure();
		expect(counts.getMaxKey()).toBe("");
		counts.inc("a");
		counts.dec("a");
		expect(counts.getMinKey()).toBe("");
	});

	it("matches a map of counts on random operations", () => {
		const random = createRandom(432);
		for (let run = 0; run < 200; run++) {
			const counts = new AllOoneDataStructure();
			const reference = new Map<string, number>();
			for (let step = 0; step < 80; step++) {
				const key = ["a", "b", "c", "d"][random.int(0, 3)] ?? "a";
				if (random.int(0, 2) > 0 || !reference.has(key)) {
					counts.inc(key);
					reference.set(key, (reference.get(key) ?? 0) + 1);
				} else {
					counts.dec(key);
					const count = (reference.get(key) ?? 1) - 1;
					if (count === 0) reference.delete(key);
					else reference.set(key, count);
				}
				const values = [...reference.values()];
				const maxKey = counts.getMaxKey();
				const minKey = counts.getMinKey();
				if (reference.size === 0) {
					expect([maxKey, minKey]).toEqual(["", ""]);
				} else {
					expect(reference.get(maxKey)).toBe(Math.max(...values));
					expect(reference.get(minKey)).toBe(Math.min(...values));
				}
			}
		}
	});
});
