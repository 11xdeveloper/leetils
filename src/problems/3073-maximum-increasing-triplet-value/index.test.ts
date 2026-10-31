import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumIncreasingTripletValue as maximumTripletValue } from ".";

/** Checks every triplet. */
const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			for (let k = j + 1; k < nums.length; k++) {
				const [a = 0, b = 0, c = 0] = [nums[i], nums[j], nums[k]];
				if (a < b && b < c) best = Math.max(best, a - b + c);
			}
	return best;
};

describe("3073. Maximum Increasing Triplet Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTripletValue([5, 6, 9])).toBe(8);
		expect(maximumTripletValue([1, 5, 3, 6])).toBe(4);
	});

	it("matches checking every triplet on random arrays", () => {
		const random = createRandom(3073);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 12), 1, 10);
			const expected = byBruteForce(nums);
			if (expected === Number.NEGATIVE_INFINITY) continue;
			expect(maximumTripletValue(nums)).toBe(expected);
		}
	});
});
