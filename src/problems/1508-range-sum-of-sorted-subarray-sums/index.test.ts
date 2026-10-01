import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rangeSumOfSortedSubarraySums as rangeSum } from ".";

describe("1508. Range Sum of Sorted Subarray Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(rangeSum([1, 2, 3, 4], 4, 1, 5)).toBe(13);
		expect(rangeSum([1, 2, 3, 4], 4, 3, 4)).toBe(6);
		expect(rangeSum([1, 2, 3, 4], 4, 1, 10)).toBe(50);
	});

	it("handles the largest input", () => {
		const nums = new Array<number>(1000).fill(100);
		// Each subarray of length L sums to 100L; there are 1001 − L of them.
		let expected = 0;
		for (let length = 1; length <= 1000; length++)
			expected += (1001 - length) * 100 * length;
		expect(rangeSum(nums, 1000, 1, 500500)).toBe(expected % 1_000_000_007);
	});

	it("matches listing sums with ordinary arrays on random inputs", () => {
		const random = createRandom(1508);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 100);
			const n = nums.length;
			const all: number[] = [];
			for (let i = 0; i < n; i++)
				for (let j = i; j < n; j++)
					all.push(nums.slice(i, j + 1).reduce((s, x) => s + x, 0));
			all.sort((a, b) => a - b);
			const left = random.int(1, all.length);
			const right = random.int(left, all.length);
			expect(rangeSum(nums, n, left, right)).toBe(
				all.slice(left - 1, right).reduce((s, x) => s + x, 0),
			);
		}
	});
});
