import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { searchInRotatedSortedArrayII } from ".";

describe("81. Search in Rotated Sorted Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(searchInRotatedSortedArrayII([2, 5, 6, 0, 0, 1, 2], 0)).toBeTrue();
		expect(searchInRotatedSortedArrayII([2, 5, 6, 0, 0, 1, 2], 3)).toBeFalse();
	});

	it("handles arrays where the ends and middle are equal", () => {
		expect(searchInRotatedSortedArrayII([1, 0, 1, 1, 1], 0)).toBeTrue();
		expect(searchInRotatedSortedArrayII([1, 1, 1, 0, 1], 0)).toBeTrue();
		expect(searchInRotatedSortedArrayII([1, 1, 1, 1, 1], 2)).toBeFalse();
	});

	it("agrees with includes for every rotation of random sorted arrays", () => {
		const random = createRandom(81);
		for (let run = 0; run < 200; run++) {
			const sorted = random
				.array(random.int(1, 12), 0, 5)
				.toSorted((a, b) => a - b);
			for (let rotation = 0; rotation < sorted.length; rotation++) {
				const nums = [...sorted.slice(rotation), ...sorted.slice(0, rotation)];
				for (let target = -1; target <= 6; target++) {
					expect(searchInRotatedSortedArrayII(nums, target)).toBe(
						nums.includes(target),
					);
				}
			}
		}
	});
});
