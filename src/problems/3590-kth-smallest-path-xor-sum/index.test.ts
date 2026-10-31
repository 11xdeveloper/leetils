import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthSmallestPathXorSum as kthSmallest } from ".";

/** Collects each subtree's values directly. */
const byBruteForce = (
	vals: number[],
	par: number[],
	queries: number[][],
): number[] => {
	const xor = vals.map(() => 0);
	vals.forEach((value, i) => {
		xor[i] = i === 0 ? value : (xor[par[i] ?? 0] ?? 0) ^ value;
	});
	const within = (v: number, u: number) => {
		for (let x = v; x >= 0; x = par[x] ?? -1) if (x === u) return true;
		return false;
	};
	return queries.map(([u = 0, k = 0]) => {
		const distinct = [...new Set(xor.filter((_, v) => within(v, u)))].sort(
			(a, b) => a - b,
		);
		return distinct[k - 1] ?? -1;
	});
};

describe("3590. Kth Smallest Path XOR Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kthSmallest(
				[1, 1, 1],
				[-1, 0, 0],
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
			),
		).toEqual([0, 1, -1]);
		expect(
			kthSmallest(
				[5, 2, 7],
				[-1, 0, 1],
				[
					[0, 1],
					[1, 2],
					[1, 3],
					[2, 1],
				],
			),
		).toEqual([0, 7, -1, 0]);
	});

	it("matches collecting subtrees directly on random trees", () => {
		const random = createRandom(3590);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const vals = random.array(n, 0, 7);
			const par = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const queries = Array.from({ length: 8 }, () => [
				random.int(0, n - 1),
				random.int(1, 5),
			]);
			expect(kthSmallest(vals, par, queries)).toEqual(
				byBruteForce(vals, par, queries),
			);
		}
	});
});
