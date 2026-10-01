import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distinctNumbersInEachSubarray as distinctNumbers } from ".";

describe("1852. Distinct Numbers in Each Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctNumbers([1, 2, 3, 2, 2, 1, 3], 3)).toEqual([3, 2, 2, 2, 3]);
		expect(distinctNumbers([1, 1, 1, 1, 2, 3, 4], 4)).toEqual([1, 2, 3, 4]);
	});

	it("matches counting each window on random inputs", () => {
		const random = createRandom(1852);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 1, 5);
			const k = random.int(1, nums.length);
			const expected = nums
				.slice(0, nums.length - k + 1)
				.map((_, i) => new Set(nums.slice(i, i + k)).size);
			expect(distinctNumbers(nums, k)).toEqual(expected);
		}
	});
});
