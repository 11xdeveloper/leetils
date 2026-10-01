import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { circularArrayLoop } from ".";

/** Follows the moves from every index to see whether they return to it. */
const byBruteForce = (nums: number[]): boolean => {
	const n = nums.length;
	return nums.some((first, start) => {
		let i = start;
		for (let steps = 1; steps <= n; steps++) {
			if ((nums[i] ?? 0) > 0 !== first > 0) return false;
			i = (((i + (nums[i] ?? 0)) % n) + n) % n;
			if (i === start) return steps > 1;
		}
		return false;
	});
};

describe("457. Circular Array Loop", () => {
	it("solves the examples from the problem statement", () => {
		expect(circularArrayLoop([2, -1, 1, 2, 2])).toBeTrue();
		expect(circularArrayLoop([-1, -2, -3, -4, -5, 6])).toBeFalse();
		expect(circularArrayLoop([1, -1, 5, 1, 4])).toBeTrue();
	});

	it("rejects cycles of one element", () => {
		expect(circularArrayLoop([1])).toBeFalse();
		expect(circularArrayLoop([2, 1, -2])).toBeFalse();
	});

	it("matches following the moves on random inputs", () => {
		const random = createRandom(457);
		for (let run = 0; run < 2000; run++) {
			const nums = random.array(random.int(1, 8), -8, 8).map((num) => num || 1);
			expect(circularArrayLoop(nums)).toBe(byBruteForce(nums));
		}
	});
});
