import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheDuplicateNumber } from ".";

describe("287. Find the Duplicate Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTheDuplicateNumber([1, 3, 4, 2, 2])).toBe(2);
		expect(findTheDuplicateNumber([3, 1, 3, 4, 2])).toBe(3);
		expect(findTheDuplicateNumber([3, 3, 3, 3, 3])).toBe(3);
	});

	it("does not modify the input", () => {
		const nums = [1, 3, 4, 2, 2];
		findTheDuplicateNumber(nums);
		expect(nums).toEqual([1, 3, 4, 2, 2]);
	});

	it("finds the repeated value in random inputs where it repeats any number of times", () => {
		const random = createRandom(287);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 20);
			const duplicate = random.int(1, n);
			// Start from 1..n plus the duplicate, then replace some other values with it too.
			const nums = [...Array.from({ length: n }, (_, i) => i + 1), duplicate];
			for (let i = random.int(0, n - 1); i > 0; i--)
				nums[random.int(0, n)] = duplicate;
			if (nums.filter((x) => x === duplicate).length < 2) continue;
			expect(
				findTheDuplicateNumber(nums.toSorted(() => random.next() - 0.5)),
			).toBe(duplicate);
		}
	});
});
