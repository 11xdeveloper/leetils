import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { trionicArrayI } from "../3637-trionic-array-i";
import { trionicArrayII as maxSumTrionic } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 3; j < nums.length; j++) {
			const part = nums.slice(i, j + 1);
			if (trionicArrayI(part))
				best = Math.max(
					best,
					part.reduce((a, b) => a + b, 0),
				);
		}
	return best;
};

describe("3640. Trionic Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumTrionic([0, -2, -1, -3, 0, 2, -1])).toBe(-4);
		expect(maxSumTrionic([1, 4, 2, 7])).toBe(14);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3640);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(4, 12), -5, 5);
			const expected = byBruteForce(nums);
			if (expected === Number.NEGATIVE_INFINITY) continue;
			expect(maxSumTrionic(nums)).toBe(expected);
		}
	});
});
