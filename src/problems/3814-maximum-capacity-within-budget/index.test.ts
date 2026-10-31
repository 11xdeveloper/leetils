import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumCapacityWithinBudget as maxCapacity } from ".";

/** Tries every pair. */
const byBruteForce = (
	costs: number[],
	capacity: number[],
	budget: number,
): number => {
	let best = 0;
	costs.forEach((c, i) => {
		if (c < budget) best = Math.max(best, capacity[i] ?? 0);
		for (let j = i + 1; j < costs.length; j++)
			if (c + (costs[j] ?? 0) < budget)
				best = Math.max(best, (capacity[i] ?? 0) + (capacity[j] ?? 0));
	});
	return best;
};

describe("3814. Maximum Capacity Within Budget", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxCapacity([4, 8, 5, 3], [1, 5, 2, 7], 8)).toBe(8);
		expect(maxCapacity([3, 5, 7, 4], [2, 4, 3, 6], 7)).toBe(6);
		expect(maxCapacity([2, 2, 2], [3, 5, 4], 5)).toBe(9);
	});

	it("matches trying every pair on random machines", () => {
		const random = createRandom(3814);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 8);
			const [costs, capacity] = [
				random.array(n, 1, 10),
				random.array(n, 1, 10),
			];
			const budget = random.int(1, 20);
			expect(maxCapacity(costs, capacity, budget)).toBe(
				byBruteForce(costs, capacity, budget),
			);
		}
	});
});
