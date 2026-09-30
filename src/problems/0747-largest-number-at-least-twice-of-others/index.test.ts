import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestNumberAtLeastTwiceOfOthers as dominantIndex } from ".";

describe("747. Largest Number At Least Twice of Others", () => {
	it("solves the examples from the problem statement", () => {
		expect(dominantIndex([3, 6, 1, 0])).toBe(1);
		expect(dominantIndex([1, 2, 3, 4])).toBe(-1);
		expect(dominantIndex([7])).toBe(0);
	});

	it("matches comparing with every other element on random inputs", () => {
		const random = createRandom(747);
		for (let run = 0; run < 1000; run++) {
			const nums = [...new Set(random.array(random.int(1, 8), 0, 20))];
			const largest = nums.indexOf(Math.max(...nums));
			const expected = nums.every(
				(num, i) => i === largest || (nums[largest] ?? 0) >= 2 * num,
			)
				? largest
				: -1;
			expect(dominantIndex(nums)).toBe(expected);
		}
	});
});
