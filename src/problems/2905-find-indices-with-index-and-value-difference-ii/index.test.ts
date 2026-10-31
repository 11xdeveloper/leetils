import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findIndicesWithIndexAndValueDifferenceII as findIndices } from ".";

const anyPair = (nums: number[], gap: number, diff: number): boolean =>
	nums.some((a, i) =>
		nums.some((b, j) => Math.abs(i - j) >= gap && Math.abs(a - b) >= diff),
	);

describe("2905. Find Indices With Index and Value Difference II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findIndices([5, 1, 4, 1], 2, 4)).toEqual([0, 3]);
		expect(findIndices([2, 1], 0, 0)).toEqual([0, 0]);
		expect(findIndices([1, 2, 3], 2, 4)).toEqual([-1, -1]);
	});

	it("finds a valid pair exactly when one exists on random inputs", () => {
		const random = createRandom(2905);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 20);
			const gap = random.int(0, nums.length);
			const diff = random.int(0, 15);
			const [i = -1, j = -1] = findIndices(nums, gap, diff);
			if (i === -1) expect(anyPair(nums, gap, diff)).toBe(false);
			else {
				expect(Math.abs(i - j)).toBeGreaterThanOrEqual(gap);
				expect(
					Math.abs((nums[i] ?? 0) - (nums[j] ?? 0)),
				).toBeGreaterThanOrEqual(diff);
			}
		}
	});
});
