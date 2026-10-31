import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findXValueOfArrayII as resultArray } from ".";

/** Applies each update and counts prefixes directly. */
const byBruteForce = (
	nums: number[],
	k: number,
	queries: number[][],
): number[] => {
	const arr = [...nums];
	return queries.map(([index = 0, value = 0, start = 0, x = 0]) => {
		arr[index] = value;
		let product = 1 % k;
		let count = 0;
		for (let i = start; i < arr.length; i++) {
			product = (product * (arr[i] ?? 0)) % k;
			if (product === x) count++;
		}
		return count;
	});
};

describe("3525. Find X Value of Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			resultArray([1, 2, 3, 4, 5], 3, [
				[2, 2, 0, 2],
				[3, 3, 3, 0],
				[0, 1, 0, 1],
			]),
		).toEqual([2, 2, 2]);
		expect(
			resultArray([1, 2, 4, 8, 16, 32], 4, [
				[0, 2, 0, 2],
				[0, 2, 0, 1],
			]),
		).toEqual([1, 0]);
	});

	it("matches counting directly on random queries", () => {
		const random = createRandom(3525);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 9), 1, 20);
			const k = random.int(1, 5);
			const queries = Array.from({ length: random.int(1, 6) }, () => [
				random.int(0, nums.length - 1),
				random.int(1, 20),
				random.int(0, nums.length - 1),
				random.int(0, k - 1),
			]);
			expect(resultArray(nums, k, queries)).toEqual(
				byBruteForce(nums, k, queries),
			);
		}
	});
});
