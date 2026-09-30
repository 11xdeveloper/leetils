import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lengthOfLongestFibonacciSubsequence as lenLongestFibSubseq } from ".";

/** Extends every starting pair as far as it goes. */
const byBruteForce = (arr: number[]): number => {
	const values = new Set(arr);
	let longest = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			let [a, b] = [arr[i] ?? 0, arr[j] ?? 0];
			let length = 2;
			while (values.has(a + b)) {
				[a, b] = [b, a + b];
				length++;
			}
			if (length >= 3) longest = Math.max(longest, length);
		}
	}
	return longest;
};

describe("873. Length of Longest Fibonacci Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(lenLongestFibSubseq([1, 2, 3, 4, 5, 6, 7, 8])).toBe(5);
		expect(lenLongestFibSubseq([1, 3, 7, 11, 12, 14, 18])).toBe(3);
	});

	it("matches extending every starting pair on random inputs", () => {
		const random = createRandom(873);
		for (let run = 0; run < 1000; run++) {
			const arr = [...new Set(random.array(random.int(3, 15), 1, 40))].sort(
				(a, b) => a - b,
			);
			expect(lenLongestFibSubseq(arr)).toBe(byBruteForce(arr));
		}
	});
});
