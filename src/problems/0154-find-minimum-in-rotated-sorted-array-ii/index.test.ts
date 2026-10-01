import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findMinimumInRotatedSortedArrayII } from ".";

describe("154. Find Minimum in Rotated Sorted Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinimumInRotatedSortedArrayII([1, 3, 5])).toBe(1);
		expect(findMinimumInRotatedSortedArrayII([2, 2, 2, 0, 1])).toBe(0);
	});

	it("handles arrays where the ends and middle are equal", () => {
		expect(findMinimumInRotatedSortedArrayII([3, 3, 1, 3])).toBe(1);
		expect(findMinimumInRotatedSortedArrayII([3, 1, 3, 3, 3])).toBe(1);
		expect(findMinimumInRotatedSortedArrayII([1, 1, 1])).toBe(1);
	});

	it("matches Math.min for every rotation of random sorted arrays", () => {
		const random = createRandom(154);
		for (let run = 0; run < 300; run++) {
			const sorted = random
				.array(random.int(1, 12), -3, 3)
				.toSorted((a, b) => a - b);
			for (let rotation = 0; rotation < sorted.length; rotation++) {
				const nums = [...sorted.slice(rotation), ...sorted.slice(0, rotation)];
				expect(findMinimumInRotatedSortedArrayII(nums)).toBe(Math.min(...nums));
			}
		}
	});
});
