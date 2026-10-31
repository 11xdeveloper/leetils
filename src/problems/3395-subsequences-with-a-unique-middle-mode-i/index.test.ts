import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subsequencesWithAUniqueMiddleModeI as subsequencesWithMiddleMode } from ".";

/** Checks every length-5 subsequence. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	const n = nums.length;
	for (let a = 0; a < n; a++)
		for (let b = a + 1; b < n; b++)
			for (let c = b + 1; c < n; c++)
				for (let d = c + 1; d < n; d++)
					for (let e = d + 1; e < n; e++) {
						const seq = [a, b, c, d, e].map((i) => nums[i] ?? 0);
						const freq = new Map<number, number>();
						for (const v of seq) freq.set(v, (freq.get(v) ?? 0) + 1);
						const mid = freq.get(seq[2] ?? 0) ?? 0;
						if ([...freq].every(([v, f]) => v === seq[2] || f < mid)) count++;
					}
	return count;
};

describe("3395. Subsequences with a Unique Middle Mode I", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsequencesWithMiddleMode([1, 1, 1, 1, 1, 1])).toBe(6);
		expect(subsequencesWithMiddleMode([1, 2, 2, 3, 3, 4])).toBe(4);
		expect(subsequencesWithMiddleMode([0, 1, 2, 3, 4, 5, 6, 7, 8])).toBe(0);
	});

	it("matches checking every subsequence on random arrays", () => {
		const random = createRandom(3395);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(5, 11), 0, 3);
			expect(subsequencesWithMiddleMode(nums)).toBe(byBruteForce(nums));
		}
	});
});
