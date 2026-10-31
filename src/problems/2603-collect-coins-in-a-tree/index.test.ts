import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { collectCoinsInATree as collectTheCoins } from ".";

/**
 * Tries every set of nodes to stand on; the walk costs twice the edges
 * of the smallest subtree joining them.
 */
const byBruteForce = (coins: number[], edges: number[][]): number => {
	const n = coins.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const distance = coins.map((_, from) => {
		const d = coins.map(() => -1);
		d[from] = 0;
		const queue = [from];
		for (let i = 0; i < queue.length; i++)
			for (const next of neighbours[queue[i] ?? 0] ?? [])
				if (d[next] === -1) {
					d[next] = (d[queue[i] ?? 0] ?? 0) + 1;
					queue.push(next);
				}
		return d;
	});
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 1; mask < 1 << n; mask++) {
		const stops = coins.map((_, i) => i).filter((i) => (mask >> i) & 1);
		const covered = coins.every(
			(coin, node) =>
				coin === 0 || stops.some((s) => (distance[s]?.[node] ?? 9) <= 2),
		);
		if (!covered) continue;
		const kept = coins.map((_, node) =>
			stops.some((a) =>
				stops.some(
					(b) =>
						(distance[a]?.[node] ?? 0) + (distance[node]?.[b] ?? 0) ===
						distance[a]?.[b],
				),
			),
		);
		best = Math.min(best, 2 * (kept.filter(Boolean).length - 1));
	}
	return best;
};

describe("2603. Collect Coins in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			collectTheCoins(
				[1, 0, 0, 0, 0, 1],
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[3, 4],
					[4, 5],
				],
			),
		).toBe(2);
		expect(
			collectTheCoins(
				[0, 0, 0, 1, 1, 0, 0, 1],
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[1, 4],
					[2, 5],
					[5, 6],
					[5, 7],
				],
			),
		).toBe(2);
	});

	it("needs no moves when every coin is close", () => {
		expect(
			collectTheCoins(
				[1, 1, 1],
				[
					[0, 1],
					[1, 2],
				],
			),
		).toBe(0);
		expect(collectTheCoins([0, 0], [[0, 1]])).toBe(0);
	});

	it("matches trying every set of stops on random trees", () => {
		const random = createRandom(2603);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 9);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const coins = random.array(n, 0, 1);
			expect(collectTheCoins(coins, edges)).toBe(byBruteForce(coins, edges));
		}
	});
});
