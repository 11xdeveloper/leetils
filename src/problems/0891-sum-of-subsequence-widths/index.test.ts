import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfSubsequenceWidths } from ".";

describe("891. Sum of Subsequence Widths", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfSubsequenceWidths([2, 1, 3])).toBe(6);
		expect(sumOfSubsequenceWidths([2])).toBe(0);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(891);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 1, 50);
			let expected = 0;
			for (let mask = 1; mask < 1 << nums.length; mask++) {
				const chosen = nums.filter((_, i) => mask & (1 << i));
				expected += Math.max(...chosen) - Math.min(...chosen);
			}
			expect(sumOfSubsequenceWidths(nums)).toBe(expected % 1_000_000_007);
		}
	});

	it("reduces large sums modulo 10^9 + 7", () => {
		const nums = Array.from({ length: 10 ** 5 }, (_, i) => (i % 20_000) + 1);
		expect(sumOfSubsequenceWidths(nums)).toBeWithin(0, 1_000_000_007);
	});
});
