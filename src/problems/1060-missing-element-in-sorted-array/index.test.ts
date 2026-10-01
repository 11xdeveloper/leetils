import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { missingElementInSortedArray as missingElement } from ".";

describe("1060. Missing Element in Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(missingElement([4, 7, 9, 10], 1)).toBe(5);
		expect(missingElement([4, 7, 9, 10], 3)).toBe(8);
		expect(missingElement([1, 2, 4], 3)).toBe(6);
	});

	it("matches counting up on random arrays", () => {
		const random = createRandom(1060);
		for (let run = 0; run < 1000; run++) {
			const nums = [...new Set(random.array(random.int(1, 10), 0, 30))].sort(
				(a, b) => a - b,
			);
			const k = random.int(1, 20);
			const present = new Set(nums);
			let value = nums[0] ?? 0;
			for (let missing = 0; missing < k; ) if (!present.has(++value)) missing++;
			expect(missingElement(nums, k)).toBe(value);
		}
	});
});
