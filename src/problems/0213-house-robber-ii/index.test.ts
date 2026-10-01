import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { houseRobberII } from ".";

/** Tries every set of houses with no two adjacent around the circle. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length;
	let best = 0;
	for (let mask = 0; mask < 1 << n; mask++) {
		if (mask & (mask >> 1)) continue;
		if (n > 1 && mask & 1 && mask & (1 << (n - 1))) continue;
		best = Math.max(
			best,
			nums.reduce((sum, money, i) => (mask & (1 << i) ? sum + money : sum), 0),
		);
	}
	return best;
};

describe("213. House Robber II", () => {
	it("solves the examples from the problem statement", () => {
		expect(houseRobberII([2, 3, 2])).toBe(3);
		expect(houseRobberII([1, 2, 3, 1])).toBe(4);
		expect(houseRobberII([1, 2, 3])).toBe(3);
	});

	it("handles a single house", () => {
		expect(houseRobberII([7])).toBe(7);
	});

	it("matches trying every set of houses on random inputs", () => {
		const random = createRandom(213);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 12), 0, 20);
			expect(houseRobberII(nums)).toBe(byBruteForce(nums));
		}
	});
});
