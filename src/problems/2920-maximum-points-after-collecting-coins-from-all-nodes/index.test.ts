import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPointsAfterCollectingCoinsFromAllNodes as maximumPoints } from ".";

/** Tries every choice at every node. */
const byBruteForce = (
	edges: number[][],
	coins: number[],
	k: number,
): number => {
	const n = coins.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) children[a]?.push(b);
	const best = (node: number, halvings: number): number => {
		const value = Math.floor((coins[node] ?? 0) / 2 ** halvings);
		const keep =
			value -
			k +
			(children[node] ?? []).reduce((s, c) => s + best(c, halvings), 0);
		const halve =
			Math.floor(value / 2) +
			(children[node] ?? []).reduce((s, c) => s + best(c, halvings + 1), 0);
		return Math.max(keep, halve);
	};
	return best(0, 0);
};

describe("2920. Maximum Points After Collecting Coins From All Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumPoints(
				[
					[0, 1],
					[1, 2],
					[2, 3],
				],
				[10, 10, 3, 3],
				5,
			),
		).toBe(11);
		expect(
			maximumPoints(
				[
					[0, 1],
					[0, 2],
				],
				[8, 4, 4],
				0,
			),
		).toBe(16);
	});

	it("matches trying every choice on random trees", () => {
		const random = createRandom(2920);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const coins = random.array(n, 0, 40);
			const k = random.int(0, 10);
			expect(maximumPoints(edges, coins, k)).toBe(
				byBruteForce(edges, coins, k),
			);
		}
	});
});
