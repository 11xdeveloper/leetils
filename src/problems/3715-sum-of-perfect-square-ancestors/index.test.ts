import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfPerfectSquareAncestors as sumOfAncestors } from ".";

/** Checks every ancestor of every node. */
const byBruteForce = (n: number, edges: number[][], nums: number[]): number => {
	const parent = new Array<number>(n).fill(-1);
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const order = [0];
	const seen = new Set([0]);
	for (let i = 0; i < order.length; i++)
		for (const to of adjacent[order[i] ?? 0] ?? [])
			if (!seen.has(to)) {
				seen.add(to);
				parent[to] = order[i] ?? 0;
				order.push(to);
			}
	let total = 0;
	for (let v = 0; v < n; v++)
		for (let a = parent[v] ?? -1; a >= 0; a = parent[a] ?? -1) {
			const product = (nums[v] ?? 0) * (nums[a] ?? 0);
			if (Number.isInteger(Math.sqrt(product))) total++;
		}
	return total;
};

describe("3715. Sum of Perfect Square Ancestors", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sumOfAncestors(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[2, 8, 2],
			),
		).toBe(3);
		expect(
			sumOfAncestors(
				3,
				[
					[0, 1],
					[0, 2],
				],
				[1, 2, 4],
			),
		).toBe(1);
		expect(
			sumOfAncestors(
				4,
				[
					[0, 1],
					[0, 2],
					[1, 3],
				],
				[1, 2, 9, 4],
			),
		).toBe(2);
	});

	it("matches checking every ancestor on random trees", () => {
		const random = createRandom(3715);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const nums = random.array(n, 1, 50);
			expect(sumOfAncestors(n, edges, nums)).toBe(byBruteForce(n, edges, nums));
		}
	});
});
