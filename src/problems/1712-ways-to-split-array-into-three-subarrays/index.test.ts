import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { waysToSplitArrayIntoThreeSubarrays as waysToSplit } from ".";

/** Tries every pair of cut points. */
const byBruteForce = (nums: number[]): number => {
	const sum = (from: number, to: number) =>
		nums.slice(from, to).reduce((s, num) => s + num, 0);
	let ways = 0;
	for (let i = 1; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (sum(0, i) <= sum(i, j) && sum(i, j) <= sum(j, nums.length)) ways++;
		}
	}
	return ways;
};

describe("1712. Ways to Split Array Into Three Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToSplit([1, 1, 1])).toBe(1);
		expect(waysToSplit([1, 2, 2, 2, 5, 0])).toBe(3);
		expect(waysToSplit([3, 2, 1])).toBe(0);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1712);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 12), 0, 5);
			expect(waysToSplit(nums)).toBe(byBruteForce(nums));
		}
	});
});
