import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findPeakElement } from ".";

const isPeak = (nums: number[], i: number): boolean =>
	(nums[i] ?? 0) > (nums[i - 1] ?? Number.NEGATIVE_INFINITY) &&
	(nums[i] ?? 0) > (nums[i + 1] ?? Number.NEGATIVE_INFINITY);

describe("162. Find Peak Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPeakElement([1, 2, 3, 1])).toBe(2);
		expect([1, 5]).toContain(findPeakElement([1, 2, 1, 3, 5, 6, 4]));
	});

	it("handles peaks at either end", () => {
		expect(findPeakElement([1])).toBe(0);
		expect(findPeakElement([3, 2, 1])).toBe(0);
		expect(findPeakElement([1, 2, 3])).toBe(2);
	});

	it("returns a peak on random inputs with no equal neighbours", () => {
		const random = createRandom(162);
		for (let run = 0; run < 1000; run++) {
			const nums = [random.int(0, 9)];
			for (let i = random.int(0, 20); i > 0; i--) {
				const last = nums.at(-1) ?? 0;
				let next = random.int(0, 9);
				if (next === last) next++;
				nums.push(next);
			}
			expect(isPeak(nums, findPeakElement(nums))).toBeTrue();
		}
	});
});
