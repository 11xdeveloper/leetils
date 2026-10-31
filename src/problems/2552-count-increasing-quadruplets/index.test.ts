import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countIncreasingQuadruplets as countQuadruplets } from ".";

/** Checks every quadruplet. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length;
	let count = 0;
	for (let i = 0; i < n; i++)
		for (let j = i + 1; j < n; j++)
			for (let k = j + 1; k < n; k++)
				for (let l = k + 1; l < n; l++) {
					const [a = 0, b = 0, c = 0, d = 0] = [
						nums[i],
						nums[j],
						nums[k],
						nums[l],
					];
					if (a < c && c < b && b < d) count++;
				}
	return count;
};

describe("2552. Count Increasing Quadruplets", () => {
	it("solves the examples from the problem statement", () => {
		expect(countQuadruplets([1, 3, 2, 4, 5])).toBe(2);
		expect(countQuadruplets([1, 2, 3, 4])).toBe(0);
	});

	it("matches checking every quadruplet on random permutations", () => {
		const random = createRandom(2552);
		for (let run = 0; run < 200; run++) {
			const nums = Array.from({ length: random.int(4, 10) }, (_, i) => i + 1);
			for (let i = nums.length - 1; i > 0; i--) {
				const j = random.int(0, i);
				[nums[i], nums[j]] = [nums[j] ?? 0, nums[i] ?? 0];
			}
			expect(countQuadruplets(nums)).toBe(byBruteForce(nums));
		}
	});
});
