import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkingExistenceOfEdgeLengthLimitedPaths as distanceLimitedPathsExist } from ".";

/** Searches from p using only short enough edges, per query. */
const byBruteForce = (edges: number[][], queries: number[][]): boolean[] =>
	queries.map(([p = 0, q = 0, limit = 0]) => {
		const seen = new Set([p]);
		const stack = [p];
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			for (const [u, v, length = 0] of edges) {
				if (length >= limit) continue;
				const other = u === node ? v : v === node ? u : undefined;
				if (other === undefined || seen.has(other)) continue;
				seen.add(other);
				stack.push(other);
			}
		}
		return seen.has(q);
	});

describe("1697. Checking Existence of Edge Length Limited Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			distanceLimitedPathsExist(
				3,
				[
					[0, 1, 2],
					[1, 2, 4],
					[2, 0, 8],
					[1, 0, 16],
				],
				[
					[0, 1, 2],
					[0, 2, 5],
				],
			),
		).toEqual([false, true]);
		expect(
			distanceLimitedPathsExist(
				5,
				[
					[0, 1, 10],
					[1, 2, 5],
					[2, 3, 9],
					[3, 4, 13],
				],
				[
					[0, 4, 14],
					[1, 4, 13],
				],
			),
		).toEqual([true, false]);
	});

	it("matches a search per query on random graphs", () => {
		const random = createRandom(1697);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 8);
			const edges = Array.from({ length: random.int(0, 12) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
				random.int(1, 10),
			]);
			const queries = Array.from({ length: 10 }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
				random.int(1, 11),
			]);
			expect(distanceLimitedPathsExist(n, edges, queries)).toEqual(
				byBruteForce(edges, queries),
			);
		}
	});
});
