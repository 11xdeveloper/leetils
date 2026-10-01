import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToReduceXToZero as minOperations } from ".";

/** Tries every number of elements taken from each end. */
const byBruteForce = (nums: number[], x: number): number => {
	let best = Infinity;
	for (let front = 0; front <= nums.length; front++) {
		for (let back = 0; front + back <= nums.length; back++) {
			const taken = [
				...nums.slice(0, front),
				...nums.slice(nums.length - back),
			];
			if (taken.reduce((sum, num) => sum + num, 0) === x)
				best = Math.min(best, front + back);
		}
	}
	return best === Infinity ? -1 : best;
};

describe("1658. Minimum Operations to Reduce X to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 1, 4, 2, 3], 5)).toBe(2);
		expect(minOperations([5, 6, 7, 8, 9], 4)).toBe(-1);
		expect(minOperations([3, 2, 20, 1, 1, 3], 10)).toBe(5);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1658);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 5);
			const x = random.int(1, 30);
			expect(minOperations(nums, x)).toBe(byBruteForce(nums, x));
		}
	});
});
