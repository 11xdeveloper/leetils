import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { chooseKElementsWithMaximumSum as findMaxSum } from ".";

describe("3478. Choose K Elements With Maximum Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaxSum([4, 2, 1, 5, 3], [10, 20, 30, 40, 50], 2)).toEqual([
			80, 30, 0, 80, 50,
		]);
		expect(findMaxSum([2, 2, 2, 2], [3, 1, 2, 3], 1)).toEqual([0, 0, 0, 0]);
	});

	it("matches sorting candidates for every index", () => {
		const random = createRandom(3478);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const nums1 = random.array(n, 1, 5);
			const nums2 = random.array(n, 1, 9);
			const k = random.int(1, n);
			const expected = nums1.map((v) =>
				nums2
					.filter((_, j) => (nums1[j] ?? 0) < v)
					.sort((a, b) => b - a)
					.slice(0, k)
					.reduce((a, b) => a + b, 0),
			);
			expect(findMaxSum(nums1, nums2, k)).toEqual(expected);
		}
	});
});
