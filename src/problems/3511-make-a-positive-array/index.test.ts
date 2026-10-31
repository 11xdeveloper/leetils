import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeAPositiveArray } from ".";

const positive = (arr: number[]): boolean => {
	for (let i = 0; i < arr.length; i++) {
		let sum = 0;
		for (let j = i; j < arr.length; j++) {
			sum += arr[j] ?? 0;
			if (j - i >= 2 && sum <= 0) return false;
		}
	}
	return true;
};

/** Tries every set of replacements, with huge values. */
const byBruteForce = (nums: number[]): number => {
	let best = nums.length;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const changed = nums.map((v, i) => ((mask >> i) & 1 ? 1e9 : v));
		if (positive(changed))
			best = Math.min(best, mask.toString(2).replaceAll("0", "").length);
	}
	return best;
};

describe("3511. Make a Positive Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeAPositiveArray([-10, 15, -12])).toBe(1);
		expect(makeAPositiveArray([-1, -2, 3, -1, 2, 6])).toBe(1);
		expect(makeAPositiveArray([1, 2, 3])).toBe(0);
	});

	it("matches trying every replacement on random arrays", () => {
		const random = createRandom(3511);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), -6, 6);
			expect(makeAPositiveArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
