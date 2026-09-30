import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reverseSubarrayToMaximizeArrayValue as maxValueAfterReverse } from ".";

/** Tries every reversal. */
const byBruteForce = (nums: number[]): number => {
	const value = (a: number[]) =>
		a.reduce(
			(sum, x, i) => (i === 0 ? 0 : sum + Math.abs(x - (a[i - 1] ?? 0))),
			0,
		);
	let best = value(nums);
	for (let l = 0; l < nums.length; l++) {
		for (let r = l + 1; r < nums.length; r++) {
			best = Math.max(
				best,
				value([
					...nums.slice(0, l),
					...nums.slice(l, r + 1).reverse(),
					...nums.slice(r + 1),
				]),
			);
		}
	}
	return best;
};

describe("1330. Reverse Subarray To Maximize Array Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValueAfterReverse([2, 3, 1, 5, 4])).toBe(10);
		expect(maxValueAfterReverse([2, 4, 9, 24, 2, 1, 10])).toBe(68);
	});

	it("matches trying every reversal on random inputs", () => {
		const random = createRandom(1330);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(2, 10), -10, 10);
			expect(maxValueAfterReverse(nums)).toBe(byBruteForce(nums));
		}
	});
});
