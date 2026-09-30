import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { globalAndLocalInversions as isIdealPermutation } from ".";

describe("775. Global and Local Inversions", () => {
	it("solves the examples from the problem statement", () => {
		expect(isIdealPermutation([1, 0, 2])).toBeTrue();
		expect(isIdealPermutation([1, 2, 0])).toBeFalse();
	});

	it("matches counting both kinds of inversion on random permutations", () => {
		const random = createRandom(775);
		for (let run = 0; run < 1000; run++) {
			const nums = Array.from({ length: random.int(1, 9) }, (_, i) => i);
			// Mostly nearly-sorted permutations, so both answers are common.
			for (let swaps = random.int(0, 3); swaps > 0; swaps--) {
				const i = random.int(0, nums.length - 1);
				const j = random.int(0, 1)
					? Math.min(i + 1, nums.length - 1)
					: random.int(0, nums.length - 1);
				[nums[i], nums[j]] = [nums[j] ?? 0, nums[i] ?? 0];
			}
			let global = 0;
			let local = 0;
			for (let i = 0; i < nums.length; i++) {
				for (let j = i + 1; j < nums.length; j++) {
					if ((nums[i] ?? 0) > (nums[j] ?? 0)) {
						global++;
						if (j === i + 1) local++;
					}
				}
			}
			expect(isIdealPermutation(nums)).toBe(global === local);
		}
	});
});
