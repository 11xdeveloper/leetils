import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfPerfectPairs as perfectPairs } from ".";

/** Checks every pair against the definition. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++) {
			const [a = 0, b = 0] = [nums[i], nums[j]];
			const [d, s] = [Math.abs(a - b), Math.abs(a + b)];
			if (
				Math.min(d, s) <= Math.min(Math.abs(a), Math.abs(b)) &&
				Math.max(d, s) >= Math.max(Math.abs(a), Math.abs(b))
			)
				count++;
		}
	return count;
};

describe("3649. Number of Perfect Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(perfectPairs([0, 1, 2, 3])).toBe(2);
		expect(perfectPairs([-3, 2, -1, 4])).toBe(4);
		expect(perfectPairs([1, 10, 100, 1000])).toBe(0);
	});

	it("matches the definition on random arrays", () => {
		const random = createRandom(3649);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), -10, 10);
			expect(perfectPairs(nums)).toBe(byBruteForce(nums));
		}
	});
});
