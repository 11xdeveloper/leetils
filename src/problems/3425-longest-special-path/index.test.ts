import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSpecialPath } from ".";

/** Walks up from every node. */
const byBruteForce = (edges: number[][], nums: number[]): number[] => {
	const n = nums.length;
	const parent = new Array<number>(n).fill(-1);
	const weight = new Array<number>(n).fill(0);
	const adjacent: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const order = [0];
	const seen = new Set([0]);
	for (let i = 0; i < order.length; i++)
		for (const [next, w] of adjacent[order[i] ?? 0] ?? [])
			if (!seen.has(next)) {
				seen.add(next);
				parent[next] = order[i] ?? 0;
				weight[next] = w;
				order.push(next);
			}
	let best = [-1, 0];
	for (let bottom = 0; bottom < n; bottom++) {
		const values = new Set<number>();
		let length = 0;
		let nodes = 0;
		for (let at = bottom; at !== -1; at = parent[at] ?? -1) {
			if (values.has(nums[at] ?? 0)) break;
			values.add(nums[at] ?? 0);
			nodes++;
			if (
				length > (best[0] ?? 0) ||
				(length === best[0] && nodes < (best[1] ?? 0))
			)
				best = [length, nodes];
			length += weight[at] ?? 0;
		}
	}
	return best;
};

describe("3425. Longest Special Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestSpecialPath(
				[
					[0, 1, 2],
					[1, 2, 3],
					[1, 3, 5],
					[1, 4, 4],
					[2, 5, 6],
				],
				[2, 1, 2, 1, 3, 1],
			),
		).toEqual([6, 2]);
		expect(longestSpecialPath([[1, 0, 8]], [2, 2])).toEqual([0, 1]);
	});

	it("matches walking up from every node on random trees", () => {
		const random = createRandom(3425);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 10);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
				random.int(0, 5),
			]);
			const nums = random.array(n, 1, 3);
			expect(longestSpecialPath(edges, nums)).toEqual(
				byBruteForce(edges, nums),
			);
		}
	});
});
