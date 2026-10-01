import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToReachDestinationInTime as minCost } from ".";

/** Explores every walk within the time limit, keeping the best cost per (city, time). */
const byBruteForce = (
	maxTime: number,
	edges: number[][],
	fees: number[],
): number => {
	const n = fees.length;
	let best = Infinity;
	const seen = new Map<string, number>();
	const stack: [number, number, number][] = [[0, 0, fees[0] ?? 0]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [city, time, cost] = entry;
		const key = `${city},${time}`;
		if ((seen.get(key) ?? Infinity) <= cost) continue;
		seen.set(key, cost);
		if (city === n - 1) best = Math.min(best, cost);
		for (const [x, y, t = 0] of edges) {
			const next = x === city ? y : y === city ? x : undefined;
			if (next === undefined || time + t > maxTime) continue;
			stack.push([next, time + t, cost + (fees[next] ?? 0)]);
		}
	}
	return best === Infinity ? -1 : best;
};

describe("1928. Minimum Cost to Reach Destination in Time", () => {
	const edges = [
		[0, 1, 10],
		[1, 2, 10],
		[2, 5, 10],
		[0, 3, 1],
		[3, 4, 10],
		[4, 5, 15],
	];
	const fees = [5, 1, 2, 20, 20, 3];

	it("solves the examples from the problem statement", () => {
		expect(minCost(30, edges, fees)).toBe(11);
		expect(minCost(29, edges, fees)).toBe(48);
		expect(minCost(25, edges, fees)).toBe(-1);
	});

	it("matches exploring every walk on random graphs", () => {
		const random = createRandom(1928);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 6);
			const graph = Array.from({ length: random.int(1, 8) }, () => {
				const x = random.int(0, n - 1);
				return [x, (x + random.int(1, n - 1)) % n, random.int(1, 5)];
			});
			const passing = random.array(n, 1, 10);
			const maxTime = random.int(1, 15);
			expect(minCost(maxTime, graph, passing)).toBe(
				byBruteForce(maxTime, graph, passing),
			);
		}
	});
});
