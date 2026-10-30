import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSumOfMountainTripletsII as minimumSum } from ".";

/** Checks every triplet. */
const byBruteForce = (nums: number[]): number => {
	let best = -1;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			for (let k = j + 1; k < nums.length; k++) {
				const [a = 0, b = 0, c = 0] = [nums[i], nums[j], nums[k]];
				if (a < b && b > c && (best === -1 || a + b + c < best))
					best = a + b + c;
			}
	return best;
};

describe("2909. Minimum Sum of Mountain Triplets II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSum([8, 6, 1, 5, 3])).toBe(9);
		expect(minimumSum([5, 4, 8, 7, 10, 2])).toBe(13);
		expect(minimumSum([6, 5, 4, 3, 4, 5])).toBe(-1);
	});

	it("matches checking every triplet on random inputs", () => {
		const random = createRandom(2909);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 10), 1, 10);
			expect(minimumSum(nums)).toBe(byBruteForce(nums));
		}
	});
});
