import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubtreesWithMaxDistanceBetweenCities as countSubgraphsForEachDiameter } from ".";

/** Checks connectivity and distances with a search inside each subset. */
const byBruteForce = (n: number, edges: number[][]): number[] => {
	const counts = new Array<number>(n - 1).fill(0);
	for (let mask = 1; mask < 1 << n; mask++) {
		const inSet = (c: number) => (mask & (1 << (c - 1))) !== 0;
		const cities = Array.from({ length: n }, (_, i) => i + 1).filter(inSet);
		if (cities.length < 2) continue;
		const bfs = (start: number) => {
			const dist = new Map([[start, 0]]);
			const queue = [start];
			for (let i = 0; i < queue.length; i++) {
				const city = queue[i] ?? 0;
				for (const [a, b] of edges) {
					const other = a === city ? b : b === city ? a : undefined;
					if (other === undefined || !inSet(other) || dist.has(other)) continue;
					dist.set(other, (dist.get(city) ?? 0) + 1);
					queue.push(other);
				}
			}
			return dist;
		};
		if (bfs(cities[0] ?? 1).size !== cities.length) continue;
		const diameter = Math.max(
			...cities.map((c) => Math.max(...bfs(c).values())),
		);
		counts[diameter - 1] = (counts[diameter - 1] ?? 0) + 1;
	}
	return counts;
};

describe("1617. Count Subtrees With Max Distance Between Cities", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countSubgraphsForEachDiameter(4, [
				[1, 2],
				[2, 3],
				[2, 4],
			]),
		).toEqual([3, 4, 0]);
		expect(countSubgraphsForEachDiameter(2, [[1, 2]])).toEqual([1]);
		expect(
			countSubgraphsForEachDiameter(3, [
				[1, 2],
				[2, 3],
			]),
		).toEqual([2, 1]);
	});

	it("matches searching each subset on random trees", () => {
		const random = createRandom(1617);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 8);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(1, i + 1),
				i + 2,
			]);
			expect(countSubgraphsForEachDiameter(n, edges)).toEqual(
				byBruteForce(n, edges),
			);
		}
	});
});
