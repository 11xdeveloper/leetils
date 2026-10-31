import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestCycleInAGraph as findShortestCycle } from ".";

/** For each edge, the shortest path between its ends without it, plus one. */
const byBruteForce = (n: number, edges: number[][]): number => {
	let shortest = Number.POSITIVE_INFINITY;
	for (const [skip, [a = 0, b = 0]] of edges.entries()) {
		const neighbours: number[][] = Array.from({ length: n }, () => []);
		for (const [i, [x = 0, y = 0]] of edges.entries())
			if (i !== skip) {
				neighbours[x]?.push(y);
				neighbours[y]?.push(x);
			}
		const distance = Array.from({ length: n }, () => -1);
		distance[a] = 0;
		const queue = [a];
		for (let i = 0; i < queue.length; i++)
			for (const next of neighbours[queue[i] ?? 0] ?? [])
				if (distance[next] === -1) {
					distance[next] = (distance[queue[i] ?? 0] ?? 0) + 1;
					queue.push(next);
				}
		if ((distance[b] ?? -1) >= 0)
			shortest = Math.min(shortest, (distance[b] ?? 0) + 1);
	}
	return shortest === Number.POSITIVE_INFINITY ? -1 : shortest;
};

describe("2608. Shortest Cycle in a Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findShortestCycle(7, [
				[0, 1],
				[1, 2],
				[2, 0],
				[3, 4],
				[4, 5],
				[5, 6],
				[6, 3],
			]),
		).toBe(3);
		expect(
			findShortestCycle(4, [
				[0, 1],
				[0, 2],
			]),
		).toBe(-1);
	});

	it("matches removing each edge in turn on random graphs", () => {
		const random = createRandom(2608);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 8);
			const edges: number[][] = [];
			for (let a = 0; a < n; a++)
				for (let b = a + 1; b < n; b++)
					if (random.int(0, 3) === 0) edges.push([a, b]);
			expect(findShortestCycle(n, edges)).toBe(byBruteForce(n, edges));
		}
	});
});
