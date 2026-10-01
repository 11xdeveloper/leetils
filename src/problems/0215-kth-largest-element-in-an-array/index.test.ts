import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthLargestElementInAnArray } from ".";

describe("215. Kth Largest Element in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthLargestElementInAnArray([3, 2, 1, 5, 6, 4], 2)).toBe(5);
		expect(kthLargestElementInAnArray([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
	});

	it("handles arrays of one repeated value", () => {
		expect(kthLargestElementInAnArray(new Array(100_000).fill(1), 50_000)).toBe(
			1,
		);
	});

	it("does not modify the input", () => {
		const nums = [3, 1, 2];
		kthLargestElementInAnArray(nums, 1);
		expect(nums).toEqual([3, 1, 2]);
	});

	it("matches sorting for every k on random inputs", () => {
		const random = createRandom(215);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 20), -5, 5);
			const sorted = nums.toSorted((a, b) => b - a);
			for (let k = 1; k <= nums.length; k++) {
				expect(kthLargestElementInAnArray(nums, k)).toBe(sorted[k - 1] ?? 0);
			}
		}
	});
});
