import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { targetSum as findTargetSumWays } from ".";

const byBruteForce = (nums: number[], target: number): number => {
	let ways = 0;
	for (let signs = 0; signs < 1 << nums.length; signs++) {
		const value = nums.reduce(
			(sum, num, i) => sum + (signs & (1 << i) ? num : -num),
			0,
		);
		if (value === target) ways++;
	}
	return ways;
};

describe("494. Target Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTargetSumWays([1, 1, 1, 1, 1], 3)).toBe(5);
		expect(findTargetSumWays([1], 1)).toBe(1);
	});

	it("counts both signs for zeros", () => {
		expect(findTargetSumWays([0, 0, 1], 1)).toBe(4);
	});

	it("matches trying every choice of signs on random inputs", () => {
		const random = createRandom(494);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 6);
			const target = random.int(-15, 15);
			expect(findTargetSumWays(nums, target)).toBe(byBruteForce(nums, target));
		}
	});
});
