import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { addEdgesToMakeDegreesOfAllNodesEven as isPossible } from ".";

/** Tries adding every set of up to two missing edges. */
const byBruteForce = (n: number, edges: number[][]): boolean => {
	const key = (a: number, b: number) => `${Math.min(a, b)},${Math.max(a, b)}`;
	const present = new Set(edges.map(([a = 0, b = 0]) => key(a, b)));
	const missing: [number, number][] = [];
	for (let a = 1; a <= n; a++)
		for (let b = a + 1; b <= n; b++)
			if (!present.has(key(a, b))) missing.push([a, b]);
	const even = (added: [number, number][]): boolean => {
		const degree = Array.from({ length: n + 1 }, () => 0);
		for (const [a = 0, b = 0] of [...edges, ...added]) {
			degree[a] = (degree[a] ?? 0) + 1;
			degree[b] = (degree[b] ?? 0) + 1;
		}
		return degree.every((d) => d % 2 === 0);
	};
	if (even([])) return true;
	for (let i = 0; i < missing.length; i++) {
		const first = missing[i] ?? [0, 0];
		if (even([first])) return true;
		for (let j = i + 1; j < missing.length; j++)
			if (even([first, missing[j] ?? [0, 0]])) return true;
	}
	return false;
};

describe("2508. Add Edges to Make Degrees of All Nodes Even", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isPossible(5, [
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 2],
				[1, 4],
				[2, 5],
			]),
		).toBe(true);
		expect(
			isPossible(4, [
				[1, 2],
				[3, 4],
			]),
		).toBe(true);
		expect(
			isPossible(4, [
				[1, 2],
				[1, 3],
				[1, 4],
			]),
		).toBe(false);
	});

	it("matches trying every pair of added edges on random graphs", () => {
		const random = createRandom(2508);
		for (let run = 0; run < 300; run++) {
			const n = random.int(3, 7);
			const edges: number[][] = [];
			for (let a = 1; a <= n; a++)
				for (let b = a + 1; b <= n; b++)
					if (random.int(0, 2) === 0) edges.push([a, b]);
			expect(isPossible(n, edges)).toBe(byBruteForce(n, edges));
		}
	});
});
