import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxConsecutiveOnes } from "../0485-max-consecutive-ones";
import { maxConsecutiveOnesII } from ".";

/** Tries flipping each zero in turn, or none. */
const byBruteForce = (nums: number[]): number =>
	Math.max(
		maxConsecutiveOnes(nums),
		...nums.map((num, i) =>
			num === 0 ? maxConsecutiveOnes(nums.with(i, 1)) : 0,
		),
	);

describe("487. Max Consecutive Ones II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxConsecutiveOnesII([1, 0, 1, 1, 0])).toBe(4);
		expect(maxConsecutiveOnesII([1, 0, 1, 1, 0, 1])).toBe(4);
	});

	it("matches trying every flip on random inputs", () => {
		const random = createRandom(487);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 20), 0, 1);
			expect(maxConsecutiveOnesII(nums)).toBe(byBruteForce(nums));
		}
	});
});
