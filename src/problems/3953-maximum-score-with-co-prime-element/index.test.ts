import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreWithCoPrimeElement as maxScore } from ".";

/** Tries every pick and final value, changing conflicts to 1. */
const byBruteForce = (nums: number[], maxVal: number): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let best = Number.NEGATIVE_INFINITY;
	nums.forEach((num, i) => {
		for (const v of [num, ...Array.from({ length: maxVal }, (_, k) => k + 1)]) {
			let cost = v === num ? 0 : 1;
			nums.forEach((other, j) => {
				if (j !== i && gcd(other, v) !== 1) cost++;
			});
			best = Math.max(best, v - cost);
		}
	});
	return best;
};

describe("3953. Maximum Score with Co-Prime Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([3, 4, 6], 5)).toBe(4);
		expect(maxScore([1, 2, 3], 4)).toBe(3);
		expect(maxScore([2, 2], 1)).toBe(1);
	});

	it("matches trying every pick on random arrays", () => {
		const random = createRandom(3953);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 7), 1, 30);
			const maxVal = random.int(1, 30);
			expect(maxScore(nums, maxVal)).toBe(byBruteForce(nums, maxVal));
		}
	});
});
