import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subtreeInversionSum } from ".";

/** Tries every valid set of inverted nodes. */
const byBruteForce = (edges: number[][], nums: number[], k: number): number => {
	const n = nums.length;
	const parent = new Array<number>(n).fill(-1);
	const depth = new Array<number>(n).fill(0);
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const order = [0];
	const seen = new Set([0]);
	for (let i = 0; i < order.length; i++)
		for (const next of adjacent[order[i] ?? 0] ?? [])
			if (!seen.has(next)) {
				seen.add(next);
				parent[next] = order[i] ?? 0;
				depth[next] = (depth[order[i] ?? 0] ?? 0) + 1;
				order.push(next);
			}
	let best = Number.NEGATIVE_INFINITY;
	for (let mask = 0; mask < 1 << n; mask++) {
		let ok = true;
		for (let v = 0; v < n && ok; v++) {
			if (!((mask >> v) & 1)) continue;
			for (let a = parent[v] ?? -1; a >= 0; a = parent[a] ?? -1)
				if ((mask >> a) & 1 && (depth[v] ?? 0) - (depth[a] ?? 0) < k)
					ok = false;
		}
		if (!ok) continue;
		let sum = 0;
		for (let v = 0; v < n; v++) {
			let flips = 0;
			for (let a = v; a >= 0; a = parent[a] ?? -1) if ((mask >> a) & 1) flips++;
			sum += (flips % 2 ? -1 : 1) * (nums[v] ?? 0);
		}
		best = Math.max(best, sum);
	}
	return best;
};

describe("3544. Subtree Inversion Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			subtreeInversionSum(
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[1, 4],
					[2, 5],
					[2, 6],
				],
				[4, -8, -6, 3, 7, -2, 5],
				2,
			),
		).toBe(27);
		expect(
			subtreeInversionSum(
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[3, 4],
				],
				[-1, 3, -2, 4, -5],
				2,
			),
		).toBe(9);
		expect(
			subtreeInversionSum(
				[
					[0, 1],
					[0, 2],
				],
				[0, -1, -2],
				3,
			),
		).toBe(3);
	});

	it("matches trying every inversion set on random trees", () => {
		const random = createRandom(3544);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 9);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const nums = random.array(n, -6, 6);
			const k = random.int(1, 3);
			expect(subtreeInversionSum(edges, nums, k)).toBe(
				byBruteForce(edges, nums, k),
			);
		}
	});
});
