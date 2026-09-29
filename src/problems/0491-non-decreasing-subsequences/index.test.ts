import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nonDecreasingSubsequences as findSubsequences } from ".";

const sortedKeys = (lists: number[][]): string[] =>
	lists.map((list) => list.join()).sort();

const byBruteForce = (nums: number[]): number[][] => {
	const found = new Map<string, number[]>();
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		if (
			chosen.length >= 2 &&
			chosen.every((v, i) => i === 0 || v >= (chosen[i - 1] ?? 0))
		)
			found.set(chosen.join(), chosen);
	}
	return [...found.values()];
};

describe("491. Non-decreasing Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortedKeys(findSubsequences([4, 6, 7, 7]))).toEqual(
			sortedKeys([
				[4, 6],
				[4, 6, 7],
				[4, 6, 7, 7],
				[4, 7],
				[4, 7, 7],
				[6, 7],
				[6, 7, 7],
				[7, 7],
			]),
		);
		expect(findSubsequences([4, 4, 3, 2, 1])).toEqual([[4, 4]]);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(491);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -2, 3);
			const result = findSubsequences(nums);
			expect(new Set(sortedKeys(result)).size).toBe(result.length);
			expect(sortedKeys(result)).toEqual(sortedKeys(byBruteForce(nums)));
		}
	});
});
