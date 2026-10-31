import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubarrayDivisibleByKWithAtMostOneNegationI } from "../4063-longest-subarray-divisible-by-k-with-at-most-one-negation-i";
import { longestSubarrayDivisibleByKWithAtMostOneNegationII as longestSubarray } from ".";

describe("4064. Longest Subarray Divisible by K with At Most One Negation II", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([4, 1, 2], 3)).toBe(3);
		expect(longestSubarray([5, 3, 4], 7)).toBe(2);
		expect(longestSubarray([2, 2, 5], 6)).toBe(2);
	});

	it("matches part I on random arrays", () => {
		const random = createRandom(4064);
		for (let run = 0; run < 400; run++) {
			const nums = random.array(random.int(1, 14), -9, 9);
			const k = random.int(1, 12);
			expect(longestSubarray(nums, k)).toBe(
				longestSubarrayDivisibleByKWithAtMostOneNegationI(nums, k),
			);
		}
	});
});
