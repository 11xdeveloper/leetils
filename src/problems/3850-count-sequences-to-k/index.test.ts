import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSequencesToK as countSequences } from ".";

/** Tries every choice sequence with exact fractions. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let code = 0; code < 3 ** nums.length; code++) {
		let [top, bottom] = [1n, 1n];
		let x = code;
		for (const num of nums) {
			if (x % 3 === 1) top *= BigInt(num);
			else if (x % 3 === 2) bottom *= BigInt(num);
			x = Math.floor(x / 3);
		}
		if (top === BigInt(k) * bottom) count++;
	}
	return count;
};

describe("3850. Count Sequences to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSequences([2, 3, 2], 6)).toBe(2);
		expect(countSequences([4, 6, 3], 2)).toBe(2);
		expect(countSequences([1, 5], 1)).toBe(3);
	});

	it("matches trying every sequence on random input", () => {
		const random = createRandom(3850);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 7), 1, 6);
			const k = random.int(1, 30);
			expect(countSequences(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
