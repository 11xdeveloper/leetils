import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionArrayForMaximumXorAndAnd as maximizeXorAndXor } from ".";

/** Tries every assignment to the three groups. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let code = 0; code < 3 ** nums.length; code++) {
		let [a, c] = [0, 0];
		let and = -1;
		let x = code;
		for (const num of nums) {
			const group = x % 3;
			x = Math.floor(x / 3);
			if (group === 0) a ^= num;
			else if (group === 1) and = and === -1 ? num : and & num;
			else c ^= num;
		}
		best = Math.max(best, a + Math.max(0, and) + c);
	}
	return best;
};

describe("3630. Partition Array for Maximum XOR and AND", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeXorAndXor([2, 3])).toBe(5);
		expect(maximizeXorAndXor([1, 3, 2])).toBe(6);
		expect(maximizeXorAndXor([2, 3, 6, 7])).toBe(15);
	});

	it("matches trying every assignment on random arrays", () => {
		const random = createRandom(3630);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 7), 1, 40);
			expect(maximizeXorAndXor(nums)).toBe(byBruteForce(nums));
		}
	});
});
