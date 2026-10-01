import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreOfAGoodSubarray as maximumScore } from ".";

describe("1793. Maximum Score of a Good Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumScore([1, 4, 3, 7, 4, 5], 3)).toBe(15);
		expect(maximumScore([5, 5, 4, 5, 4, 1, 1, 1], 0)).toBe(20);
	});

	it("matches checking every good subarray on random inputs", () => {
		const random = createRandom(1793);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 10);
			const k = random.int(0, nums.length - 1);
			let best = 0;
			for (let i = 0; i <= k; i++) {
				for (let j = k; j < nums.length; j++)
					best = Math.max(
						best,
						Math.min(...nums.slice(i, j + 1)) * (j - i + 1),
					);
			}
			expect(maximumScore(nums, k)).toBe(best);
		}
	});
});
