import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subarrayWithElementsGreaterThanVaryingThreshold as validSubarraySize } from ".";

const exists = (nums: number[], threshold: number): boolean => {
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j <= nums.length; j++)
			if (nums.slice(i, j).every((v) => v > threshold / (j - i))) return true;
	return false;
};

const isValid = (nums: number[], threshold: number, k: number): boolean => {
	for (let i = 0; i + k <= nums.length; i++)
		if (nums.slice(i, i + k).every((v) => v > threshold / k)) return true;
	return false;
};

describe("2334. Subarray With Elements Greater Than Varying Threshold", () => {
	it("solves the examples from the problem statement", () => {
		expect(validSubarraySize([1, 3, 4, 3, 1], 6)).toBe(3);
		const size = validSubarraySize([6, 5, 6, 5, 8], 7);
		expect(isValid([6, 5, 6, 5, 8], 7, size)).toBeTrue();
	});

	it("finds a valid size exactly when one exists", () => {
		const random = createRandom(2334);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 10);
			const threshold = random.int(1, 40);
			const size = validSubarraySize(nums, threshold);
			if (exists(nums, threshold))
				expect(isValid(nums, threshold, size)).toBeTrue();
			else expect(size).toBe(-1);
		}
	});
});
