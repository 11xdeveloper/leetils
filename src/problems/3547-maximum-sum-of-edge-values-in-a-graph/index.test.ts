import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOfEdgeValuesInAGraph as maxScore } from ".";

/** Tries every assignment of values. */
const byBruteForce = (n: number, edges: number[][]): number => {
	let best = 0;
	const permute = (values: number[], used: number): void => {
		if (values.length === n) {
			best = Math.max(
				best,
				edges.reduce(
					(sum, [u = 0, v = 0]) => sum + (values[u] ?? 0) * (values[v] ?? 0),
					0,
				),
			);
			return;
		}
		for (let v = 1; v <= n; v++)
			if (!((used >> v) & 1)) permute([...values, v], used | (1 << v));
	};
	permute([], 0);
	return best;
};

describe("3547. Maximum Sum of Edge Values in a Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxScore(4, [
				[0, 1],
				[1, 2],
				[2, 3],
			]),
		).toBe(23);
		expect(
			maxScore(6, [
				[0, 3],
				[4, 5],
				[2, 0],
				[1, 3],
				[2, 4],
				[1, 5],
			]),
		).toBe(82);
	});

	it("matches trying every assignment on random path and cycle graphs", () => {
		const random = createRandom(3547);
		for (let run = 0; run < 60; run++) {
			const n = random.int(1, 7);
			const nodes = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const edges: number[][] = [];
			for (let i = 0; i < n; ) {
				const size = random.int(1, n - i);
				const part = nodes.slice(i, i + size);
				for (let j = 0; j + 1 < part.length; j++)
					edges.push([part[j] ?? 0, part[j + 1] ?? 0]);
				if (size >= 3 && random.int(0, 1) === 1)
					edges.push([part[0] ?? 0, part.at(-1) ?? 0]);
				i += size;
			}
			expect(maxScore(n, edges)).toBe(byBruteForce(n, edges));
		}
	});
});
