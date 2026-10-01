import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestRangeII } from ".";

describe("910. Smallest Range II", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestRangeII([1], 0)).toBe(0);
		expect(smallestRangeII([0, 10], 2)).toBe(6);
		expect(smallestRangeII([1, 3, 6], 3)).toBe(3);
	});

	it("matches trying every choice of signs on random inputs", () => {
		const random = createRandom(910);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 8), 0, 20);
			const k = random.int(0, 10);
			let best = Number.POSITIVE_INFINITY;
			for (let mask = 0; mask < 1 << nums.length; mask++) {
				const changed = nums.map((num, i) =>
					mask & (1 << i) ? num + k : num - k,
				);
				best = Math.min(best, Math.max(...changed) - Math.min(...changed));
			}
			expect(smallestRangeII(nums, k)).toBe(best);
		}
	});
});
