import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { treeOfCoprimes as getCoprimes } from ".";

/** Walks up each node's ancestors. */
const byBruteForce = (nums: number[], edges: number[][]): number[] => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const parent = new Array<number>(nums.length).fill(-1);
	const order = [0];
	const seen = new Set([0]);
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const [u, v] of edges) {
			const other = u === node ? v : v === node ? u : undefined;
			if (other === undefined || seen.has(other)) continue;
			seen.add(other);
			parent[other] = node;
			order.push(other);
		}
	}
	return nums.map((value, node) => {
		for (let up = parent[node] ?? -1; up !== -1; up = parent[up] ?? -1)
			if (gcd(value, nums[up] ?? 0) === 1) return up;
		return -1;
	});
};

describe("1766. Tree of Coprimes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getCoprimes(
				[2, 3, 3, 2],
				[
					[0, 1],
					[1, 2],
					[1, 3],
				],
			),
		).toEqual([-1, 0, 0, 1]);
		expect(
			getCoprimes(
				[5, 6, 10, 2, 3, 6, 15],
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[1, 4],
					[2, 5],
					[2, 6],
				],
			),
		).toEqual([-1, 0, -1, 0, 0, 0, -1]);
	});

	it("matches walking up the ancestors on random trees", () => {
		const random = createRandom(1766);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 15);
			const nums = random.array(n, 1, 50);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			expect(getCoprimes(nums, edges)).toEqual(byBruteForce(nums, edges));
		}
	});
});
