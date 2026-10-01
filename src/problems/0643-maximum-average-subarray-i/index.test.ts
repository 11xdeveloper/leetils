import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAverageSubarrayI as findMaxAverage } from ".";

describe("643. Maximum Average Subarray I", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaxAverage([1, 12, -5, -6, 50, 3], 4)).toBe(12.75);
		expect(findMaxAverage([5], 1)).toBe(5);
	});

	it("matches averaging every window on random inputs", () => {
		const random = createRandom(643);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), -100, 100);
			const k = random.int(1, nums.length);
			const expected = Math.max(
				...Array.from(
					{ length: nums.length - k + 1 },
					(_, i) => nums.slice(i, i + k).reduce((a, b) => a + b, 0) / k,
				),
			);
			expect(findMaxAverage(nums, k)).toBeCloseTo(expected, 9);
		}
	});
});
