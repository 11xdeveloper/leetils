import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { totalCostToHireKWorkers as totalCost } from ".";

/** Simulates each round on the remaining list. */
const bySimulation = (
	costs: number[],
	k: number,
	candidates: number,
): number => {
	const remaining = costs.map((cost, i) => [cost, i] as const);
	let total = 0;
	for (let round = 0; round < k; round++) {
		const pool =
			remaining.length <= 2 * candidates
				? remaining
				: [...remaining.slice(0, candidates), ...remaining.slice(-candidates)];
		const chosen = pool.reduce((best, worker) =>
			worker[0] < best[0] || (worker[0] === best[0] && worker[1] < best[1])
				? worker
				: best,
		);
		total += chosen[0];
		remaining.splice(remaining.indexOf(chosen), 1);
	}
	return total;
};

describe("2462. Total Cost to Hire K Workers", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalCost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4)).toBe(11);
		expect(totalCost([1, 2, 4, 1], 3, 3)).toBe(4);
	});

	it("matches simulating on random inputs", () => {
		const random = createRandom(2462);
		for (let run = 0; run < 300; run++) {
			const costs = random.array(random.int(1, 12), 1, 9);
			const k = random.int(1, costs.length);
			const candidates = random.int(1, costs.length);
			expect(totalCost(costs, k, candidates)).toBe(
				bySimulation(costs, k, candidates),
			);
		}
	});
});
