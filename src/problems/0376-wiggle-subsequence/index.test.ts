import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wiggleSubsequence } from ".";

const isWiggle = (values: number[]): boolean => {
	const differences = values.slice(1).map((v, i) => v - (values[i] ?? 0));
	return differences.every(
		(d, i) =>
			d !== 0 &&
			(i === 0 || Math.sign(d) !== Math.sign(differences[i - 1] ?? 0)),
	);
};

const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const subsequence = nums.filter((_, i) => mask & (1 << i));
		if (subsequence.length > best && isWiggle(subsequence))
			best = subsequence.length;
	}
	return best;
};

describe("376. Wiggle Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(wiggleSubsequence([1, 7, 4, 9, 2, 5])).toBe(6);
		expect(wiggleSubsequence([1, 17, 5, 10, 13, 15, 10, 5, 16, 8])).toBe(7);
		expect(wiggleSubsequence([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(2);
	});

	it("counts equal elements as one", () => {
		expect(wiggleSubsequence([3, 3, 3])).toBe(1);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(376);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 5);
			expect(wiggleSubsequence(nums)).toBe(byBruteForce(nums));
		}
	});
});
