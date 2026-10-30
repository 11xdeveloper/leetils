import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { happyStudents as countWays } from ".";

/** Tries every group. */
const byBruteForce = (nums: number[]): number => {
	const sizes = new Set<number>();
	let ways = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const g = mask.toString(2).replaceAll("0", "").length;
		if (nums.every((v, i) => ((mask >> i) & 1 ? g > v : g < v))) {
			ways++;
			sizes.add(g);
		}
	}
	return ways;
};

describe("2860. Happy Students", () => {
	it("solves the examples from the problem statement", () => {
		expect(countWays([1, 1])).toBe(2);
		expect(countWays([6, 0, 3, 3, 6, 7, 2, 7])).toBe(3);
	});

	it("matches trying every group on random inputs", () => {
		const random = createRandom(2860);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 9);
			const nums = random.array(n, 0, n - 1);
			expect(countWays(nums)).toBe(byBruteForce(nums));
		}
	});
});
