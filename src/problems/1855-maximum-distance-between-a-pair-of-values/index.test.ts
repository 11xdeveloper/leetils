import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumDistanceBetweenAPairOfValues as maxDistance } from ".";

describe("1855. Maximum Distance Between a Pair of Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistance([55, 30, 5, 4, 2], [100, 20, 10, 10, 5])).toBe(2);
		expect(maxDistance([2, 2, 2], [10, 10, 1])).toBe(1);
		expect(maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25])).toBe(2);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1855);
		for (let run = 0; run < 300; run++) {
			const a = random.array(random.int(1, 8), 1, 20).sort((x, y) => y - x);
			const b = random.array(random.int(1, 8), 1, 20).sort((x, y) => y - x);
			let best = 0;
			for (let i = 0; i < a.length; i++)
				for (let j = i; j < b.length; j++)
					if ((a[i] ?? 0) <= (b[j] ?? 0)) best = Math.max(best, j - i);
			expect(maxDistance(a, b)).toBe(best);
		}
	});
});
