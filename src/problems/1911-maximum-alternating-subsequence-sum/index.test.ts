import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAlternatingSubsequenceSum as maxAlternatingSum } from ".";

describe("1911. Maximum Alternating Subsequence Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAlternatingSum([4, 2, 5, 3])).toBe(7);
		expect(maxAlternatingSum([5, 6, 7, 8])).toBe(8);
		expect(maxAlternatingSum([6, 2, 1, 2, 4, 5])).toBe(10);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1911);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			let best = 0;
			for (let mask = 1; mask < 1 << nums.length; mask++) {
				const sub = nums.filter((_, i) => mask & (1 << i));
				best = Math.max(
					best,
					sub.reduce((s, v, i) => (i % 2 === 0 ? s + v : s - v), 0),
				);
			}
			expect(maxAlternatingSum(nums)).toBe(best);
		}
	});
});
