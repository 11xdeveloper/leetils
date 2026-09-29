import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestUnsortedContinuousSubarray as findUnsortedSubarray } from ".";

/** Compares with the sorted array: the subarray spans the first and last mismatch. */
const bySorting = (nums: number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const first = nums.findIndex((num, i) => num !== sorted[i]);
	const last = nums.findLastIndex((num, i) => num !== sorted[i]);
	return first === -1 ? 0 : last - first + 1;
};

describe("581. Shortest Unsorted Continuous Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])).toBe(5);
		expect(findUnsortedSubarray([1, 2, 3, 4])).toBe(0);
		expect(findUnsortedSubarray([1])).toBe(0);
	});

	it("matches comparing with the sorted array on random inputs", () => {
		const random = createRandom(581);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), -5, 5);
			expect(findUnsortedSubarray(nums)).toBe(bySorting(nums));
		}
	});
});
