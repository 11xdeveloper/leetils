import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { containsDuplicateIII } from ".";

const byBruteForce = (
	nums: number[],
	indexDiff: number,
	valueDiff: number,
): boolean =>
	nums.some((num, i) =>
		nums
			.slice(i + 1, i + 1 + indexDiff)
			.some((other) => Math.abs(num - other) <= valueDiff),
	);

describe("220. Contains Duplicate III", () => {
	it("solves the examples from the problem statement", () => {
		expect(containsDuplicateIII([1, 2, 3, 1], 3, 0)).toBeTrue();
		expect(containsDuplicateIII([1, 5, 9, 1, 5, 9], 2, 3)).toBeFalse();
	});

	it("handles negative values, which round down into their buckets", () => {
		expect(containsDuplicateIII([-3, 3], 1, 6)).toBeTrue();
		expect(containsDuplicateIII([-1, 1], 1, 1)).toBeFalse();
	});

	it("handles values at the limits of the constraints", () => {
		expect(containsDuplicateIII([-1e9, 1e9], 1, 1e9)).toBeFalse();
		expect(containsDuplicateIII([-1e9, 0], 1, 1e9)).toBeTrue();
	});

	it("matches checking every nearby pair on random inputs", () => {
		const random = createRandom(220);
		for (let run = 0; run < 2000; run++) {
			const nums = random.array(random.int(2, 15), -20, 20);
			const indexDiff = random.int(1, 6);
			const valueDiff = random.int(0, 6);
			expect(containsDuplicateIII(nums, indexDiff, valueDiff)).toBe(
				byBruteForce(nums, indexDiff, valueDiff),
			);
		}
	});
});
