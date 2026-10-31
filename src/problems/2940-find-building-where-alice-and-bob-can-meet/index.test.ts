import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findBuildingWhereAliceAndBobCanMeet as leftmostBuildingQueries } from ".";

/** Checks every building for each query. */
const byBruteForce = (heights: number[], queries: number[][]): number[] =>
	queries.map(([a = 0, b = 0]) => {
		const reach = (from: number, to: number): boolean =>
			from === to || (from < to && (heights[from] ?? 0) < (heights[to] ?? 0));
		for (let j = 0; j < heights.length; j++)
			if (reach(a, j) && reach(b, j)) return j;
		return -1;
	});

describe("2940. Find Building Where Alice and Bob Can Meet", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			leftmostBuildingQueries(
				[6, 4, 8, 5, 2, 7],
				[
					[0, 1],
					[0, 3],
					[2, 4],
					[3, 4],
					[2, 2],
				],
			),
		).toEqual([2, 5, -1, 5, 2]);
		expect(
			leftmostBuildingQueries(
				[5, 3, 8, 2, 6, 1, 4, 6],
				[
					[0, 7],
					[3, 5],
					[5, 2],
					[3, 0],
					[1, 6],
				],
			),
		).toEqual([7, 6, -1, 4, 6]);
	});

	it("matches checking every building on random inputs", () => {
		const random = createRandom(2940);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const heights = random.array(n, 1, 8);
			const queries = Array.from({ length: 6 }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(leftmostBuildingQueries(heights, queries)).toEqual(
				byBruteForce(heights, queries),
			);
		}
	});
});
