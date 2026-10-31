import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumValueOfAnOrderedTripletII as maximumTripletValue } from ".";

/** Checks every triplet. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			for (let k = j + 1; k < nums.length; k++)
				best = Math.max(
					best,
					((nums[i] ?? 0) - (nums[j] ?? 0)) * (nums[k] ?? 0),
				);
	return best;
};

describe("2874. Maximum Value of an Ordered Triplet II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTripletValue([12, 6, 1, 2, 7])).toBe(77);
		expect(maximumTripletValue([1, 10, 3, 4, 19])).toBe(133);
		expect(maximumTripletValue([1, 2, 3])).toBe(0);
	});

	it("matches checking every triplet on random inputs", () => {
		const random = createRandom(2874);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 10), 1, 20);
			expect(maximumTripletValue(nums)).toBe(byBruteForce(nums));
		}
	});
});
