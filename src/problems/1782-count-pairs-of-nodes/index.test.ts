import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPairsOfNodes as countPairs } from ".";

/** Counts incident edges for every pair directly. */
const byBruteForce = (
	n: number,
	edges: number[][],
	queries: number[],
): number[] =>
	queries.map((query) => {
		let pairs = 0;
		for (let a = 1; a <= n; a++) {
			for (let b = a + 1; b <= n; b++) {
				if (
					edges.filter(([u, v]) => u === a || v === a || u === b || v === b)
						.length > query
				)
					pairs++;
			}
		}
		return pairs;
	});

describe("1782. Count Pairs Of Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countPairs(
				4,
				[
					[1, 2],
					[2, 4],
					[1, 3],
					[2, 3],
					[2, 1],
				],
				[2, 3],
			),
		).toEqual([6, 5]);
		expect(
			countPairs(
				5,
				[
					[1, 5],
					[1, 5],
					[3, 4],
					[2, 5],
					[1, 3],
					[5, 1],
					[2, 3],
					[2, 5],
				],
				[1, 2, 3, 4, 5],
			),
		).toEqual([10, 10, 9, 8, 6]);
	});

	it("matches counting every pair on random graphs", () => {
		const random = createRandom(1782);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 7);
			const edges = Array.from({ length: random.int(1, 12) }, () => {
				const u = random.int(1, n);
				return [u, ((u + random.int(0, n - 2)) % n) + 1];
			});
			const queries = Array.from({ length: 5 }, () => random.int(0, 12));
			expect(countPairs(n, edges, queries)).toEqual(
				byBruteForce(n, edges, queries),
			);
		}
	});
});
