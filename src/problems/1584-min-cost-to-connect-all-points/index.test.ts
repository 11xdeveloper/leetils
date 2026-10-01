import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minCostToConnectAllPoints as minCostConnectPoints } from ".";

/** Kruskal's algorithm on every pair. */
const byBruteForce = (points: number[][]): number => {
	const edges: [number, number, number][] = [];
	points.forEach(([x1 = 0, y1 = 0], i) => {
		points.forEach(([x2 = 0, y2 = 0], j) => {
			if (i < j) edges.push([Math.abs(x1 - x2) + Math.abs(y1 - y2), i, j]);
		});
	});
	edges.sort((a, b) => a[0] - b[0]);
	const group = points.map((_, i) => i);
	let total = 0;
	for (const [cost, a, b] of edges) {
		const [ga, gb] = [group[a], group[b]];
		if (ga === gb) continue;
		total += cost;
		for (let i = 0; i < group.length; i++)
			if (group[i] === ga) group[i] = gb ?? 0;
	}
	return total;
};

describe("1584. Min Cost to Connect All Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCostConnectPoints([
				[0, 0],
				[2, 2],
				[3, 10],
				[5, 2],
				[7, 0],
			]),
		).toBe(20);
		expect(
			minCostConnectPoints([
				[3, 12],
				[-2, 5],
				[-4, 1],
			]),
		).toBe(18);
	});

	it("costs nothing for one point", () => {
		expect(minCostConnectPoints([[5, 5]])).toBe(0);
	});

	it("matches Kruskal's algorithm on random points", () => {
		const random = createRandom(1584);
		for (let run = 0; run < 200; run++) {
			const points = Array.from({ length: random.int(1, 12) }, () => [
				random.int(-20, 20),
				random.int(-20, 20),
			]);
			expect(minCostConnectPoints(points)).toBe(byBruteForce(points));
		}
	});
});
