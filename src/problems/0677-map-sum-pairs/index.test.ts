import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MapSumPairs as MapSum } from ".";

describe("677. Map Sum Pairs", () => {
	it("solves the example from the problem statement", () => {
		const map = new MapSum();
		map.insert("apple", 3);
		expect(map.sum("ap")).toBe(3);
		map.insert("app", 2);
		expect(map.sum("ap")).toBe(5);
	});

	it("matches scanning every key on random operations, including overwrites", () => {
		const random = createRandom(677);
		for (let run = 0; run < 100; run++) {
			const map = new MapSum();
			const reference = new Map<string, number>();
			for (let op = 0; op < 50; op++) {
				if (random.int(0, 1) === 0) {
					const key = random.string(random.int(1, 4), "ab");
					const val = random.int(1, 1000);
					map.insert(key, val);
					reference.set(key, val);
				} else {
					const prefix = random.string(random.int(1, 3), "ab");
					const expected = [...reference]
						.filter(([key]) => key.startsWith(prefix))
						.reduce((total, [, val]) => total + val, 0);
					expect(map.sum(prefix)).toBe(expected);
				}
			}
		}
	});
});
