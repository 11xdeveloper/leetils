import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { slidingWindowMaximum } from ".";

const byBruteForce = (nums: number[], k: number): number[] =>
	Array.from({ length: nums.length - k + 1 }, (_, i) =>
		Math.max(...nums.slice(i, i + k)),
	);

describe("239. Sliding Window Maximum", () => {
	it("solves the examples from the problem statement", () => {
		expect(slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([
			3, 3, 5, 5, 6, 7,
		]);
		expect(slidingWindowMaximum([1], 1)).toEqual([1]);
	});

	it("returns the array itself for a window of 1, and one value for the whole array", () => {
		expect(slidingWindowMaximum([4, -2, 7], 1)).toEqual([4, -2, 7]);
		expect(slidingWindowMaximum([4, -2, 7], 3)).toEqual([7]);
	});

	it("handles an array at the constraint of 10^5 elements", () => {
		const nums = Array.from({ length: 100_000 }, (_, i) => 100_000 - i);
		expect(slidingWindowMaximum(nums, 50_000)).toEqual(nums.slice(0, 50_001));
	});

	it("matches checking every window on random inputs", () => {
		const random = createRandom(239);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 20), -5, 5);
			const k = random.int(1, nums.length);
			expect(slidingWindowMaximum(nums, k)).toEqual(byBruteForce(nums, k));
		}
	});
});
