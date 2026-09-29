import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { houseRobber } from ".";

/** Tries every set of houses with no two adjacent. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		if (mask & (mask >> 1)) continue;
		best = Math.max(
			best,
			nums.reduce((sum, money, i) => (mask & (1 << i) ? sum + money : sum), 0),
		);
	}
	return best;
};

describe("198. House Robber", () => {
	it("solves the examples from the problem statement", () => {
		expect(houseRobber([1, 2, 3, 1])).toBe(4);
		expect(houseRobber([2, 7, 9, 3, 1])).toBe(12);
	});

	it("handles one and two houses", () => {
		expect(houseRobber([5])).toBe(5);
		expect(houseRobber([2, 3])).toBe(3);
	});

	it("matches trying every set of houses on random inputs", () => {
		const random = createRandom(198);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 20);
			expect(houseRobber(nums)).toBe(byBruteForce(nums));
		}
	});
});
