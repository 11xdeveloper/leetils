import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestDivisibleSubset } from ".";

const isDivisible = (subset: number[]): boolean =>
	subset.every((a) => subset.every((b) => a % b === 0 || b % a === 0));

const largestSize = (nums: number[]): number => {
	let best = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const subset = nums.filter((_, i) => mask & (1 << i));
		if (subset.length > best && isDivisible(subset)) best = subset.length;
	}
	return best;
};

describe("368. Largest Divisible Subset", () => {
	it("solves the examples from the problem statement", () => {
		const first = largestDivisibleSubset([1, 2, 3]);
		expect(first).toHaveLength(2);
		expect(isDivisible(first)).toBeTrue();
		expect(largestDivisibleSubset([1, 2, 4, 8])).toEqual([1, 2, 4, 8]);
	});

	it("returns a largest divisible subset of random distinct values", () => {
		const random = createRandom(368);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(1, 10), 1, 40))];
			const subset = largestDivisibleSubset(nums);
			expect(isDivisible(subset)).toBeTrue();
			expect(subset.every((x) => nums.includes(x))).toBeTrue();
			expect(subset).toHaveLength(largestSize(nums));
		}
	});
});
