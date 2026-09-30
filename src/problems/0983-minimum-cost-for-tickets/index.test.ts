import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostForTickets as mincostTickets } from ".";

/** Buys a pass on the first uncovered day, trying each kind. */
const byRecursion = (days: number[], costs: number[]): number => {
	const from = (index: number): number => {
		if (index >= days.length) return 0;
		const start = days[index] ?? 0;
		return Math.min(
			...[1, 7, 30].map((length, kind) => {
				let next = index;
				while (next < days.length && (days[next] ?? 0) < start + length) next++;
				return (costs[kind] ?? 0) + from(next);
			}),
		);
	};
	return from(0);
};

describe("983. Minimum Cost For Tickets", () => {
	it("solves the examples from the problem statement", () => {
		expect(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15])).toBe(11);
		expect(
			mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]),
		).toBe(17);
	});

	it("matches trying each pass on random schedules", () => {
		const random = createRandom(983);
		for (let run = 0; run < 300; run++) {
			const days = [...new Set(random.array(random.int(1, 12), 1, 60))].sort(
				(a, b) => a - b,
			);
			const costs = [random.int(1, 5), random.int(3, 15), random.int(10, 40)];
			expect(mincostTickets(days, costs)).toBe(byRecursion(days, costs));
		}
	});
});
