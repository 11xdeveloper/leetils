import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pathExistenceQueriesInAGraphII as pathExistenceQueries } from ".";

/** Breadth-first search for every query. */
const byBruteForce = (
	n: number,
	nums: number[],
	maxDiff: number,
	queries: number[][],
): number[] =>
	queries.map(([u = 0, v = 0]) => {
		const distance = new Array<number>(n).fill(-1);
		distance[u] = 0;
		const queue = [u];
		for (let i = 0; i < queue.length; i++) {
			const node = queue[i] ?? 0;
			for (let next = 0; next < n; next++)
				if (
					distance[next] === -1 &&
					Math.abs((nums[next] ?? 0) - (nums[node] ?? 0)) <= maxDiff
				) {
					distance[next] = (distance[node] ?? 0) + 1;
					queue.push(next);
				}
		}
		return distance[v] ?? -1;
	});

describe("3534. Path Existence Queries in a Graph II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			pathExistenceQueries(5, [1, 8, 3, 4, 2], 3, [
				[0, 3],
				[2, 4],
			]),
		).toEqual([1, 1]);
		expect(
			pathExistenceQueries(5, [5, 3, 1, 9, 10], 2, [
				[0, 1],
				[0, 2],
				[2, 3],
				[4, 3],
			]),
		).toEqual([1, 2, -1, 1]);
		expect(
			pathExistenceQueries(3, [3, 6, 1], 1, [
				[0, 0],
				[0, 1],
				[1, 2],
			]),
		).toEqual([0, -1, -1]);
	});

	it("matches breadth-first search on random graphs", () => {
		const random = createRandom(3534);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const nums = random.array(n, 0, 15);
			const maxDiff = random.int(0, 4);
			const queries = Array.from({ length: 5 }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(pathExistenceQueries(n, nums, maxDiff, queries)).toEqual(
				byBruteForce(n, nums, maxDiff, queries),
			);
		}
	});
});
