import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { arithmeticSlices } from ".";

const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 2; j < nums.length; j++) {
			const slice = nums.slice(i, j + 1);
			const step = (slice[1] ?? 0) - (slice[0] ?? 0);
			if (slice.every((v, k) => k === 0 || v - (slice[k - 1] ?? 0) === step))
				count++;
		}
	}
	return count;
};

describe("413. Arithmetic Slices", () => {
	it("solves the examples from the problem statement", () => {
		expect(arithmeticSlices([1, 2, 3, 4])).toBe(3);
		expect(arithmeticSlices([1])).toBe(0);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(413);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 0, 3);
			expect(arithmeticSlices(nums)).toBe(byBruteForce(nums));
		}
	});
});
