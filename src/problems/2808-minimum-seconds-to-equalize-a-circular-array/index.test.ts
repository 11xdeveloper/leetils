import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSecondsToEqualizeACircularArray as minimumSeconds } from ".";

/** Spreads each value until it covers the circle. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length;
	let best = n;
	for (const value of new Set(nums)) {
		let covered = nums.map((x) => x === value);
		let seconds = 0;
		while (!covered.every(Boolean)) {
			covered = covered.map(
				(c, i) => c || !!covered[(i + 1) % n] || !!covered[(i + n - 1) % n],
			);
			seconds++;
		}
		best = Math.min(best, seconds);
	}
	return best;
};

describe("2808. Minimum Seconds to Equalize a Circular Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSeconds([1, 2, 1, 2])).toBe(1);
		expect(minimumSeconds([2, 1, 3, 3, 2])).toBe(2);
		expect(minimumSeconds([5, 5, 5, 5])).toBe(0);
	});

	it("matches spreading each value on random inputs", () => {
		const random = createRandom(2808);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 4);
			expect(minimumSeconds(nums)).toBe(byBruteForce(nums));
		}
	});
});
