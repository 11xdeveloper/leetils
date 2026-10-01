import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subarraysWithKDifferentIntegers as subarraysWithKDistinct } from ".";

describe("992. Subarrays with K Different Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)).toBe(7);
		expect(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)).toBe(3);
	});

	it("matches counting distinct values in every subarray on random inputs", () => {
		const random = createRandom(992);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 1, 4);
			const k = random.int(1, 4);
			let expected = 0;
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j <= nums.length; j++)
					if (new Set(nums.slice(i, j)).size === k) expected++;
			expect(subarraysWithKDistinct(nums, k)).toBe(expected);
		}
	});
});
