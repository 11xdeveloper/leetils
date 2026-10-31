import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { differenceBetweenMaximumAndMinimumPriceSum as maxOutput } from ".";

/** Roots the tree at each node in turn. */
const byBruteForce = (
	n: number,
	edges: number[][],
	price: number[],
): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const longest = (node: number, from: number): number =>
		(price[node] ?? 0) +
		Math.max(
			0,
			...(neighbours[node] ?? [])
				.filter((x) => x !== from)
				.map((x) => longest(x, node)),
		);
	return Math.max(...price.map((p, root) => longest(root, -1) - p));
};

describe("2538. Difference Between Maximum and Minimum Price Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxOutput(
				6,
				[
					[0, 1],
					[1, 2],
					[1, 3],
					[3, 4],
					[3, 5],
				],
				[9, 8, 7, 6, 10, 5],
			),
		).toBe(24);
		expect(
			maxOutput(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[1, 1, 1],
			),
		).toBe(2);
	});

	it("matches rooting at every node on random trees", () => {
		const random = createRandom(2538);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 9);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const price = random.array(n, 1, 10);
			expect(maxOutput(n, edges, price)).toBe(byBruteForce(n, edges, price));
		}
	});
});
