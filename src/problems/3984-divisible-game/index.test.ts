import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { divisibleGame } from ".";

/** Tries every k and every subarray. */
const byBruteForce = (nums: number[]): number => {
	let [bestDifference, bestK] = [Number.NEGATIVE_INFINITY, 2];
	for (let k = 2; k <= Math.max(...nums) + 1; k++)
		for (let l = 0; l < nums.length; l++) {
			let d = 0;
			for (let r = l; r < nums.length; r++) {
				d += (nums[r] ?? 0) % k === 0 ? (nums[r] ?? 0) : -(nums[r] ?? 0);
				if (d > bestDifference) [bestDifference, bestK] = [d, k];
			}
		}
	return (
		((((bestDifference % 1_000_000_007) * bestK) % 1_000_000_007) +
			1_000_000_007) %
		1_000_000_007
	);
};

describe("3984. Divisible Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(divisibleGame([1, 4, 6, 8])).toBe(36);
		expect(divisibleGame([2, 1, 2])).toBe(6);
		expect(divisibleGame([1])).toBe(1000000005);
	});

	it("matches trying every k on random arrays", () => {
		const random = createRandom(3984);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 30);
			expect(divisibleGame(nums)).toBe(byBruteForce(nums));
		}
	});
});
