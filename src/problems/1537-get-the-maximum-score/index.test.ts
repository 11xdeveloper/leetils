import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { getTheMaximumScore as maxSum } from ".";

/** Explores every valid path. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	const arrays = [nums1, nums2];
	const walk = (which: number, i: number): number => {
		const arr = arrays[which] ?? [];
		const value = arr[i];
		if (value === undefined) return 0;
		let best = walk(which, i + 1);
		const other = arrays[1 - which] ?? [];
		const j = other.indexOf(value);
		if (j !== -1) best = Math.max(best, walk(1 - which, j + 1));
		return value + best;
	};
	return Math.max(walk(0, 0), walk(1, 0));
};

describe("1537. Get the Maximum Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([2, 4, 5, 8, 10], [4, 6, 8, 9])).toBe(30);
		expect(maxSum([1, 3, 5, 7, 9], [3, 5, 100])).toBe(109);
		expect(maxSum([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(40);
	});

	it("matches exploring every path on random inputs", () => {
		const random = createRandom(1537);
		for (let run = 0; run < 300; run++) {
			const make = () =>
				[...new Set(random.array(random.int(1, 8), 1, 15))].sort(
					(a, b) => a - b,
				);
			const [a, b] = [make(), make()];
			expect(maxSum(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
