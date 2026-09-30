import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestArithmeticSubsequence as longestArithSeqLength } from ".";

describe("1027. Longest Arithmetic Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestArithSeqLength([3, 6, 9, 12])).toBe(4);
		expect(longestArithSeqLength([9, 4, 7, 2, 10])).toBe(3);
		expect(longestArithSeqLength([20, 1, 15, 3, 10, 5, 8])).toBe(4);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1027);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 12), 0, 10);
			let expected = 2;
			for (let mask = 0; mask < 1 << nums.length; mask++) {
				const chosen = nums.filter((_, i) => mask & (1 << i));
				if (
					chosen.length > expected &&
					chosen.every(
						(v, i) =>
							i < 2 ||
							v - (chosen[i - 1] ?? 0) === (chosen[1] ?? 0) - (chosen[0] ?? 0),
					)
				)
					expected = chosen.length;
			}
			expect(longestArithSeqLength(nums)).toBe(expected);
		}
	});
});
