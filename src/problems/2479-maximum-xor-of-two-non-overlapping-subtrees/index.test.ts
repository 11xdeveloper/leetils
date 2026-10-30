import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumXorOfTwoNonOverlappingSubtrees as maxXor } from ".";

/** Checks every pair of nodes whose subtrees are disjoint. */
const byBruteForce = (
	n: number,
	parents: number[],
	values: number[],
): number => {
	const ancestorOf = (a: number, b: number): boolean => {
		for (let node = b; node !== -1; node = parents[node] ?? -1)
			if (node === a) return true;
		return false;
	};
	const sums = values.map((_, v) =>
		values.reduce((sum, value, u) => (ancestorOf(v, u) ? sum + value : sum), 0),
	);
	let best = 0;
	for (let a = 0; a < n; a++)
		for (let b = a + 1; b < n; b++)
			if (!ancestorOf(a, b) && !ancestorOf(b, a))
				best = Math.max(
					best,
					Number(BigInt(sums[a] ?? 0) ^ BigInt(sums[b] ?? 0)),
				);
	return best;
};

describe("2479. Maximum XOR of Two Non-Overlapping Subtrees", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxXor(
				6,
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[1, 4],
					[2, 5],
				],
				[2, 8, 3, 6, 2, 5],
			),
		).toBe(24);
		expect(
			maxXor(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[4, 6, 1],
			),
		).toBe(0);
	});

	it("matches checking every pair on random trees with large values", () => {
		const random = createRandom(2479);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 9);
			const parents = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const edges = parents.slice(1).map((p, i) => [p, i + 1]);
			const values = Array.from(
				{ length: n },
				() => random.int(1, 1_000_000_000) * 5000,
			);
			expect(maxXor(n, edges, values)).toBe(byBruteForce(n, parents, values));
		}
	});
});
