import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minCostClimbingStairs } from ".";

const byRecursion = (cost: number[]): number => {
	const from = (step: number): number =>
		step >= cost.length
			? 0
			: (cost[step] ?? 0) + Math.min(from(step + 1), from(step + 2));
	return Math.min(from(0), from(1));
};

describe("746. Min Cost Climbing Stairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCostClimbingStairs([10, 15, 20])).toBe(15);
		expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6);
	});

	it("matches recursion on random inputs", () => {
		const random = createRandom(746);
		for (let run = 0; run < 1000; run++) {
			const cost = random.array(random.int(2, 12), 0, 20);
			expect(minCostClimbingStairs(cost)).toBe(byRecursion(cost));
		}
	});
});
