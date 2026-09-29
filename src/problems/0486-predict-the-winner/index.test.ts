import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { predictTheWinner } from ".";

/** Plain minimax over the remaining range. */
const byMinimax = (nums: number[]): boolean => {
	const lead = (i: number, j: number): number =>
		i > j
			? 0
			: Math.max(
					(nums[i] ?? 0) - lead(i + 1, j),
					(nums[j] ?? 0) - lead(i, j - 1),
				);
	return lead(0, nums.length - 1) >= 0;
};

describe("486. Predict the Winner", () => {
	it("solves the examples from the problem statement", () => {
		expect(predictTheWinner([1, 5, 2])).toBeFalse();
		expect(predictTheWinner([1, 5, 233, 7])).toBeTrue();
	});

	it("counts a tie as a win for player 1", () => {
		expect(predictTheWinner([1, 1])).toBeTrue();
		expect(predictTheWinner([0])).toBeTrue();
	});

	it("matches plain minimax on random inputs", () => {
		const random = createRandom(486);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 20);
			expect(predictTheWinner(nums)).toBe(byMinimax(nums));
		}
	});
});
