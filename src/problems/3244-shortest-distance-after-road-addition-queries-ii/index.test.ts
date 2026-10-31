import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestDistanceAfterRoadAdditionQueriesII as shortestDistanceAfterQueries } from ".";

/** Recomputes distances after each query. */
const byBruteForce = (n: number, queries: number[][]): number[] => {
	const roads: number[][] = Array.from({ length: n }, (_, i) =>
		i + 1 < n ? [i + 1] : [],
	);
	return queries.map(([u = 0, v = 0]) => {
		roads[u]?.push(v);
		const distance = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
		distance[0] = 0;
		for (let c = 0; c < n; c++)
			for (const t of roads[c] ?? [])
				distance[t] = Math.min(distance[t] ?? 0, (distance[c] ?? 0) + 1);
		return distance[n - 1] ?? 0;
	});
};

describe("3244. Shortest Distance After Road Addition Queries II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestDistanceAfterQueries(5, [
				[2, 4],
				[0, 2],
				[0, 4],
			]),
		).toEqual([3, 2, 1]);
		expect(
			shortestDistanceAfterQueries(4, [
				[0, 3],
				[0, 2],
			]),
		).toEqual([1, 1]);
	});

	it("matches recomputing on random non-crossing roads", () => {
		const random = createRandom(3244);
		for (let run = 0; run < 300; run++) {
			const n = random.int(3, 12);
			const queries: number[][] = [];
			for (let tries = 0; tries < 20 && queries.length < 6; tries++) {
				const u = random.int(0, n - 3);
				const v = random.int(u + 2, n - 1);
				const crosses = queries.some(
					([a = 0, b = 0]) =>
						(a < u && u < b && b < v) || (u < a && a < v && v < b),
				);
				const repeat = queries.some(([a, b]) => a === u && b === v);
				if (!crosses && !repeat) queries.push([u, v]);
			}
			expect(shortestDistanceAfterQueries(n, queries)).toEqual(
				byBruteForce(n, queries),
			);
		}
	});
});
