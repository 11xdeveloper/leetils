import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestSubarrayToBeRemovedToMakeArraySorted as findLengthOfShortestSubarray } from ".";

/** Tries removing every subarray, shortest first. */
const byBruteForce = (arr: number[]): number => {
	const sorted = (a: number[]) =>
		a.every((x, i) => i === 0 || (a[i - 1] ?? 0) <= x);
	for (let length = 0; length <= arr.length; length++) {
		for (let i = 0; i + length <= arr.length; i++) {
			if (sorted([...arr.slice(0, i), ...arr.slice(i + length)])) return length;
		}
	}
	return arr.length;
};

describe("1574. Shortest Subarray to be Removed to Make Array Sorted", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLengthOfShortestSubarray([1, 2, 3, 10, 4, 2, 3, 5])).toBe(3);
		expect(findLengthOfShortestSubarray([5, 4, 3, 2, 1])).toBe(4);
		expect(findLengthOfShortestSubarray([1, 2, 3])).toBe(0);
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(1574);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 10), 0, 6);
			expect(findLengthOfShortestSubarray(arr)).toBe(byBruteForce(arr));
		}
	});
});
