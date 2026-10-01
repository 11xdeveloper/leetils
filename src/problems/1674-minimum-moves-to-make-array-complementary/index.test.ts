import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMovesToMakeArrayComplementary as minMoves } from ".";

/** Tries every target sum, costing each pair directly. */
const byBruteForce = (nums: number[], limit: number): number => {
	let best = Infinity;
	for (let target = 2; target <= 2 * limit; target++) {
		let moves = 0;
		for (let i = 0; i < nums.length / 2; i++) {
			const [a, b] = [nums[i] ?? 0, nums[nums.length - 1 - i] ?? 0];
			if (a + b === target) continue;
			moves +=
				target - a >= 1 && target - a <= limit
					? 1
					: target - b >= 1 && target - b <= limit
						? 1
						: 2;
		}
		best = Math.min(best, moves);
	}
	return best;
};

describe("1674. Minimum Moves to Make Array Complementary", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves([1, 2, 4, 3], 4)).toBe(1);
		expect(minMoves([1, 2, 2, 1], 2)).toBe(2);
		expect(minMoves([1, 2, 1, 2], 2)).toBe(0);
	});

	it("matches trying every target on random inputs", () => {
		const random = createRandom(1674);
		for (let run = 0; run < 300; run++) {
			const limit = random.int(1, 8);
			const nums = random.array(2 * random.int(1, 5), 1, limit);
			expect(minMoves(nums, limit)).toBe(byBruteForce(nums, limit));
		}
	});
});
