import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGameVI as maxResult } from ".";

/** The quadratic dynamic program. */
const byBruteForce = (nums: number[], k: number): number => {
	const best = [nums[0] ?? 0];
	for (let i = 1; i < nums.length; i++) {
		best.push((nums[i] ?? 0) + Math.max(...best.slice(Math.max(0, i - k), i)));
	}
	return best.at(-1) ?? 0;
};

describe("1696. Jump Game VI", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxResult([1, -1, -2, 4, -7, 3], 2)).toBe(7);
		expect(maxResult([10, -5, -2, 4, 0, 3], 3)).toBe(17);
		expect(maxResult([1, -5, -20, 4, -1, 3, -6, -3], 2)).toBe(0);
	});

	it("matches the quadratic dynamic program on random inputs", () => {
		const random = createRandom(1696);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), -10, 10);
			const k = random.int(1, 5);
			expect(maxResult(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
