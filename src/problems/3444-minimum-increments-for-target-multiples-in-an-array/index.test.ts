import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumIncrementsForTargetMultiplesInAnArray as minimumIncrements } from ".";

/** Tries every amount of increments for small arrays. */
const byBruteForce = (nums: number[], target: number[]): number => {
	let best = Number.POSITIVE_INFINITY;
	const raise = (i: number, values: number[], cost: number): void => {
		if (cost >= best) return;
		if (i === nums.length) {
			if (target.every((t) => values.some((v) => v % t === 0))) best = cost;
			return;
		}
		for (let extra = 0; extra <= 12; extra++)
			raise(i + 1, [...values, (nums[i] ?? 0) + extra], cost + extra);
	};
	raise(0, [], 0);
	return best;
};

describe("3444. Minimum Increments for Target Multiples in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumIncrements([1, 2, 3], [4])).toBe(1);
		expect(minimumIncrements([8, 4], [10, 5])).toBe(2);
		expect(minimumIncrements([7, 9, 10], [7])).toBe(0);
	});

	it("matches trying every increment on random arrays", () => {
		const random = createRandom(3444);
		for (let run = 0; run < 60; run++) {
			const target = random.array(random.int(1, 2), 1, 5);
			const nums = random.array(random.int(target.length, 3), 1, 8);
			expect(minimumIncrements(nums, target)).toBe(byBruteForce(nums, target));
		}
	});
});
