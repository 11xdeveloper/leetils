import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { waysToMakeAFairArray as waysToMakeFair } from ".";

/** Removes each index and compares the sums. */
const byBruteForce = (nums: number[]): number =>
	nums.filter((_, i) => {
		const rest = nums.filter((_, j) => j !== i);
		const even = rest
			.filter((_, j) => j % 2 === 0)
			.reduce((sum, num) => sum + num, 0);
		const odd = rest
			.filter((_, j) => j % 2 === 1)
			.reduce((sum, num) => sum + num, 0);
		return even === odd;
	}).length;

describe("1664. Ways to Make a Fair Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToMakeFair([2, 1, 6, 4])).toBe(1);
		expect(waysToMakeFair([1, 1, 1])).toBe(3);
		expect(waysToMakeFair([1, 2, 3])).toBe(0);
	});

	it("matches removing each index on random inputs", () => {
		const random = createRandom(1664);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 3);
			expect(waysToMakeFair(nums)).toBe(byBruteForce(nums));
		}
	});
});
