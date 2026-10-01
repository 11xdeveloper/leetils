import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumXorOfTwoNumbersInAnArray as maxXor } from ".";

const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (const a of nums) for (const b of nums) best = Math.max(best, a ^ b);
	return best;
};

describe("421. Maximum XOR of Two Numbers in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxXor([3, 10, 5, 25, 2, 8])).toBe(28);
		expect(maxXor([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])).toBe(127);
	});

	it("returns 0 for a single number", () => {
		expect(maxXor([7])).toBe(0);
	});

	it("handles the 31-bit limit", () => {
		expect(maxXor([0, 2 ** 31 - 1])).toBe(2 ** 31 - 1);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(421);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 20), 0, 2 ** 31 - 1);
			expect(maxXor(nums)).toBe(byBruteForce(nums));
		}
	});
});
