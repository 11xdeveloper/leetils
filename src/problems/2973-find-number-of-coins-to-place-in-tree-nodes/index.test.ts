import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findNumberOfCoinsToPlaceInTreeNodes as placedCoins } from ".";

/** Collects each subtree and tries every triple. */
const byBruteForce = (edges: number[][], cost: number[]): number[] => {
	const n = cost.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) children[a]?.push(b);
	const subtree = (node: number): number[] => [
		cost[node] ?? 0,
		...(children[node] ?? []).flatMap(subtree),
	];
	return cost.map((_, node) => {
		const values = subtree(node);
		if (values.length < 3) return 1;
		let best = Number.NEGATIVE_INFINITY;
		for (let i = 0; i < values.length; i++)
			for (let j = i + 1; j < values.length; j++)
				for (let k = j + 1; k < values.length; k++)
					best = Math.max(
						best,
						(values[i] ?? 0) * (values[j] ?? 0) * (values[k] ?? 0),
					);
		return Math.max(0, best);
	});
};

describe("2973. Find Number of Coins to Place in Tree Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			placedCoins(
				[
					[0, 1],
					[0, 2],
					[0, 3],
					[0, 4],
					[0, 5],
				],
				[1, 2, 3, 4, 5, 6],
			),
		).toEqual([120, 1, 1, 1, 1, 1]);
		expect(
			placedCoins(
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[1, 4],
					[1, 5],
					[2, 6],
					[2, 7],
					[2, 8],
				],
				[1, 4, 2, 3, 5, 7, 8, -4, 2],
			),
		).toEqual([280, 140, 32, 1, 1, 1, 1, 1, 1]);
		expect(
			placedCoins(
				[
					[0, 1],
					[0, 2],
				],
				[1, 2, -2],
			),
		).toEqual([0, 1, 1]);
	});

	it("matches trying every triple on random trees", () => {
		const random = createRandom(2973);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 10);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const cost = random.array(n, -10, 10).map((c) => c || 1);
			expect(placedCoins(edges, cost)).toEqual(byBruteForce(edges, cost));
		}
	});
});
