import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { singleElementInASortedArray as singleNonDuplicate } from ".";

describe("540. Single Element in a Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])).toBe(2);
		expect(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])).toBe(10);
		expect(singleNonDuplicate([1])).toBe(1);
	});

	it("finds the single element at every position of random arrays", () => {
		const random = createRandom(540);
		for (let run = 0; run < 300; run++) {
			const values = [...new Set(random.array(random.int(1, 15), 0, 100))].sort(
				(a, b) => a - b,
			);
			for (const single of values) {
				const nums = values.flatMap((value) =>
					value === single ? [value] : [value, value],
				);
				expect(singleNonDuplicate(nums)).toBe(single);
			}
		}
	});
});
