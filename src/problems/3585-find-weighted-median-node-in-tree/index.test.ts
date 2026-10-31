import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findWeightedMedianNodeInTree as findMedian } from ".";

/** Walks each path. */
const byBruteForce = (
	n: number,
	edges: number[][],
	queries: number[][],
): number[] => {
	const adjacent: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	return queries.map(([u = 0, v = 0]) => {
		const path: [number, number][] = [];
		const find = (x: number, from: number, sum: number): boolean => {
			path.push([x, sum]);
			if (x === v) return true;
			for (const [to, w] of adjacent[x] ?? [])
				if (to !== from && find(to, x, sum + w)) return true;
			path.pop();
			return false;
		};
		find(u, -1, 0);
		const total = path.at(-1)?.[1] ?? 0;
		return path.find(([, sum]) => 2 * sum >= total)?.[0] ?? v;
	});
};

describe("3585. Find Weighted Median Node in Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMedian(
				2,
				[[0, 1, 7]],
				[
					[1, 0],
					[0, 1],
				],
			),
		).toEqual([0, 1]);
		expect(
			findMedian(
				3,
				[
					[0, 1, 2],
					[2, 0, 4],
				],
				[
					[0, 1],
					[2, 0],
					[1, 2],
				],
			),
		).toEqual([1, 0, 2]);
		expect(
			findMedian(
				5,
				[
					[0, 1, 2],
					[0, 2, 5],
					[1, 3, 1],
					[2, 4, 3],
				],
				[
					[3, 4],
					[1, 2],
				],
			),
		).toEqual([2, 2]);
	});

	it("matches walking each path on random trees", () => {
		const random = createRandom(3585);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
				random.int(1, 9),
			]);
			const queries = Array.from({ length: 10 }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(findMedian(n, edges, queries)).toEqual(
				byBruteForce(n, edges, queries),
			);
		}
	});
});
