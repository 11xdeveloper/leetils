import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reachEndOfArrayWithMaxScore as findMaximumScore } from ".";

describe("3282. Reach End of Array With Max Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaximumScore([1, 3, 1, 5])).toBe(7);
		expect(findMaximumScore([4, 3, 1, 3, 2])).toBe(16);
	});

	it("matches dynamic programming over every jump", () => {
		const random = createRandom(3282);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 10);
			const best = nums.map(() => Number.NEGATIVE_INFINITY);
			best[0] = 0;
			for (let j = 1; j < nums.length; j++)
				for (let i = 0; i < j; i++)
					best[j] = Math.max(
						best[j] ?? 0,
						(best[i] ?? 0) + (j - i) * (nums[i] ?? 0),
					);
			expect(findMaximumScore(nums)).toBe(best.at(-1) ?? 0);
		}
	});
});
