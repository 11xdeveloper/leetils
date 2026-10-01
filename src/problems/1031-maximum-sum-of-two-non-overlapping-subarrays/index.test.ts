import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOfTwoNonOverlappingSubarrays as maxSumTwoNoOverlap } from ".";

describe("1031. Maximum Sum of Two Non-Overlapping Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumTwoNoOverlap([0, 6, 5, 2, 2, 5, 1, 9, 4], 1, 2)).toBe(20);
		expect(maxSumTwoNoOverlap([3, 8, 1, 3, 2, 1, 8, 9, 0], 3, 2)).toBe(29);
		expect(maxSumTwoNoOverlap([2, 1, 5, 6, 0, 9, 5, 0, 3, 8], 4, 3)).toBe(31);
	});

	it("matches trying every pair of windows on random inputs", () => {
		const random = createRandom(1031);
		const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
		for (let run = 0; run < 500; run++) {
			const [a, b] = [random.int(1, 4), random.int(1, 4)];
			const nums = random.array(random.int(a + b, 12), 0, 20);
			let expected = Number.NEGATIVE_INFINITY;
			for (let i = 0; i + a <= nums.length; i++) {
				for (let j = 0; j + b <= nums.length; j++) {
					if (i + a <= j || j + b <= i)
						expected = Math.max(
							expected,
							sum(nums.slice(i, i + a)) + sum(nums.slice(j, j + b)),
						);
				}
			}
			expect(maxSumTwoNoOverlap(nums, a, b)).toBe(expected);
		}
	});
});
