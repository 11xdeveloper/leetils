import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMakeTheArrayAlternating as minimumOperations } from ".";

/** Tries every pair of distinct values from 1 to 4. */
const byBruteForce = (nums: number[]): number => {
	let best = Infinity;
	for (let a = 0; a <= 5; a++) {
		for (let b = 0; b <= 5; b++) {
			if (a === b) continue;
			const changes = nums.filter((num, i) => num !== (i % 2 ? b : a)).length;
			best = Math.min(best, changes);
		}
	}
	return best;
};

describe("2170. Minimum Operations to Make the Array Alternating", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([3, 1, 3, 2, 4, 3])).toBe(3);
		expect(minimumOperations([1, 2, 2, 2, 2])).toBe(2);
	});

	it("matches trying every pair on random inputs", () => {
		const random = createRandom(2170);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 4);
			expect(minimumOperations(nums)).toBe(byBruteForce(nums));
		}
	});
});
