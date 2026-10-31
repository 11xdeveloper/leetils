import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSpecialSubsequences as numberOfSubsequences } from ".";

/** Checks every quadruple. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	const n = nums.length;
	for (let p = 0; p < n; p++)
		for (let q = p + 2; q < n; q++)
			for (let r = q + 2; r < n; r++)
				for (let s = r + 2; s < n; s++)
					if (
						(nums[p] ?? 0) * (nums[r] ?? 0) ===
						(nums[q] ?? 0) * (nums[s] ?? 0)
					)
						count++;
	return count;
};

describe("3404. Count Special Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSubsequences([1, 2, 3, 4, 3, 6, 1])).toBe(1);
		expect(numberOfSubsequences([3, 4, 3, 4, 3, 4, 3, 4])).toBe(3);
	});

	it("matches checking every quadruple on random arrays", () => {
		const random = createRandom(3404);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(7, 14), 1, 6);
			expect(numberOfSubsequences(nums)).toBe(byBruteForce(nums));
		}
	});
});
