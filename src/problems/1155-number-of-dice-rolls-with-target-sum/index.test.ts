import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfDiceRollsWithTargetSum as numRollsToTarget } from ".";

/** Counts every roll. */
const byBruteForce = (n: number, k: number, target: number): number => {
	if (n === 0) return target === 0 ? 1 : 0;
	let ways = 0;
	for (let face = 1; face <= k && face <= target; face++) {
		ways += byBruteForce(n - 1, k, target - face);
	}
	return ways;
};

describe("1155. Number of Dice Rolls With Target Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(numRollsToTarget(1, 6, 3)).toBe(1);
		expect(numRollsToTarget(2, 6, 7)).toBe(6);
		expect(numRollsToTarget(30, 30, 500)).toBe(222616187);
	});

	it("returns 0 for unreachable targets", () => {
		expect(numRollsToTarget(2, 6, 1)).toBe(0);
		expect(numRollsToTarget(2, 6, 13)).toBe(0);
	});

	it("matches counting every roll on random inputs", () => {
		const random = createRandom(1155);
		for (let run = 0; run < 200; run++) {
			const [n, k] = [random.int(1, 5), random.int(1, 6)];
			const target = random.int(1, n * k + 2);
			expect(numRollsToTarget(n, k, target)).toBe(byBruteForce(n, k, target));
		}
	});
});
