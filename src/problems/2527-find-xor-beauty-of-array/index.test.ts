import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findXorBeautyOfArray as xorBeauty } from ".";

/** XORs every triple. */
const byBruteForce = (nums: number[]): number => {
	let xor = 0;
	for (const a of nums)
		for (const b of nums) for (const c of nums) xor ^= (a | b) & c;
	return xor;
};

describe("2527. Find Xor-Beauty of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(xorBeauty([1, 4])).toBe(5);
		expect(xorBeauty([15, 45, 20, 2, 34, 35, 5, 44, 32, 30])).toBe(34);
	});

	it("matches XORing every triple on random inputs", () => {
		const random = createRandom(2527);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 8), 1, 64);
			expect(xorBeauty(nums)).toBe(byBruteForce(nums));
		}
	});
});
