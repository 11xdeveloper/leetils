import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestAlternatingSubarray as alternatingSubarray } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let best = -1;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++) {
			let ok = true;
			for (let k = i + 1; k <= j; k++)
				if (
					(nums[k] ?? 0) - (nums[k - 1] ?? 0) !==
					((k - i) % 2 === 1 ? 1 : -1)
				)
					ok = false;
			if (ok) best = Math.max(best, j - i + 1);
		}
	return best;
};

describe("2765. Longest Alternating Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(alternatingSubarray([2, 3, 4, 3, 4])).toBe(4);
		expect(alternatingSubarray([4, 5, 6])).toBe(2);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2765);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 12), 1, 4);
			expect(alternatingSubarray(nums)).toBe(byBruteForce(nums));
		}
	});
});
