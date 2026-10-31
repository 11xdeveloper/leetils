import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { houseRobberV as rob } from ".";

/** Tries every set of houses. */
const byBruteForce = (nums: number[], colors: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		let ok = true;
		for (let i = 1; i < nums.length; i++)
			if (
				(mask >> i) & 1 &&
				(mask >> (i - 1)) & 1 &&
				colors[i] === colors[i - 1]
			)
				ok = false;
		if (ok)
			best = Math.max(
				best,
				nums.reduce((s, x, i) => ((mask >> i) & 1 ? s + x : s), 0),
			);
	}
	return best;
};

describe("3840. House Robber V", () => {
	it("solves the examples from the problem statement", () => {
		expect(rob([1, 4, 3, 5], [1, 1, 2, 2])).toBe(9);
		expect(rob([3, 1, 2, 4], [2, 3, 2, 2])).toBe(8);
		expect(rob([10, 1, 3, 9], [1, 1, 1, 2])).toBe(22);
	});

	it("matches trying every set on random streets", () => {
		const random = createRandom(3840);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const [nums, colors] = [random.array(n, 1, 9), random.array(n, 1, 2)];
			expect(rob(nums, colors)).toBe(byBruteForce(nums, colors));
		}
	});
});
