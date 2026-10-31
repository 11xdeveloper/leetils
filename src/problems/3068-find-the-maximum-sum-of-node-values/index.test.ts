import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMaximumSumOfNodeValues as maximumValueSum } from ".";

/** Breadth-first search over every reachable set of values. */
const byBruteForce = (nums: number[], k: number, edges: number[][]): number => {
	const seen = new Set([nums.join()]);
	const queue = [nums];
	let best = 0;
	for (let q = 0; q < queue.length; q++) {
		const values = queue[q] ?? [];
		best = Math.max(
			best,
			values.reduce((a, b) => a + b, 0),
		);
		for (const [u = 0, v = 0] of edges) {
			const next = values.map((x, i) => (i === u || i === v ? x ^ k : x));
			if (!seen.has(next.join())) {
				seen.add(next.join());
				queue.push(next);
			}
		}
	}
	return best;
};

describe("3068. Find the Maximum Sum of Node Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumValueSum([1, 2, 1], 3, [
				[0, 1],
				[0, 2],
			]),
		).toBe(6);
		expect(maximumValueSum([2, 3], 7, [[0, 1]])).toBe(9);
		expect(
			maximumValueSum([7, 7, 7, 7, 7, 7], 3, [
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 4],
				[0, 5],
			]),
		).toBe(42);
	});

	it("matches searching every operation on random trees", () => {
		const random = createRandom(3068);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 7);
			const nums = random.array(n, 0, 15);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const k = random.int(1, 15);
			expect(maximumValueSum(nums, k, edges)).toBe(
				byBruteForce(nums, k, edges),
			);
		}
	});
});
