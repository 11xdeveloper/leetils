import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithFixedBounds as countSubarrays } from ".";

describe("2444. Count Subarrays With Fixed Bounds", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([1, 3, 5, 2, 7, 5], 1, 5)).toBe(2);
		expect(countSubarrays([1, 1, 1, 1], 1, 1)).toBe(10);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2444);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 6);
			const minK = random.int(1, 4);
			const maxK = random.int(minK, 6);
			let expected = 0;
			for (let i = 0; i < nums.length; i++)
				for (let j = i + 1; j <= nums.length; j++) {
					const part = nums.slice(i, j);
					if (Math.min(...part) === minK && Math.max(...part) === maxK)
						expected++;
				}
			expect(countSubarrays(nums, minK, maxK)).toBe(expected);
		}
	});
});
