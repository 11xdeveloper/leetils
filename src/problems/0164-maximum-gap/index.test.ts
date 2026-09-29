import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumGap } from ".";

const bySorting = (nums: number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let gap = 0;
	for (let i = 1; i < sorted.length; i++)
		gap = Math.max(gap, (sorted[i] ?? 0) - (sorted[i - 1] ?? 0));
	return gap;
};

describe("164. Maximum Gap", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumGap([3, 6, 9, 1])).toBe(3);
		expect(maximumGap([10])).toBe(0);
	});

	it("handles equal values and values at the constraint's limit", () => {
		expect(maximumGap([5, 5, 5])).toBe(0);
		expect(maximumGap([0, 1e9])).toBe(1e9);
		expect(maximumGap([1, 1e9, 2])).toBe(1e9 - 2);
	});

	it("matches sorting on random inputs", () => {
		const random = createRandom(164);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(
				random.int(1, 20),
				0,
				random.int(0, 1) === 0 ? 30 : 1e9,
			);
			expect(maximumGap(nums)).toBe(bySorting(nums));
		}
	});
});
