import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { modifyGraphEdgeWeights } from ".";

/** Floyd–Warshall shortest distance between two nodes. */
const shortest = (
	n: number,
	edges: number[][],
	from: number,
	to: number,
): number => {
	const d = Array.from({ length: n }, (_, i) =>
		Array.from({ length: n }, (_, j) =>
			i === j ? 0 : Number.POSITIVE_INFINITY,
		),
	);
	for (const [a = 0, b = 0, w = 0] of edges) {
		(d[a] ?? [])[b] = Math.min(d[a]?.[b] ?? 0, w);
		(d[b] ?? [])[a] = Math.min(d[b]?.[a] ?? 0, w);
	}
	for (let k = 0; k < n; k++)
		for (let i = 0; i < n; i++)
			for (let j = 0; j < n; j++) {
				const through = (d[i]?.[k] ?? 0) + (d[k]?.[j] ?? 0);
				if (through < (d[i]?.[j] ?? 0)) (d[i] ?? [])[j] = through;
			}
	return d[from]?.[to] ?? Number.POSITIVE_INFINITY;
};

/** Checks an answer, or that no answer exists when it's empty. */
const isValid = (
	n: number,
	edges: number[][],
	source: number,
	destination: number,
	target: number,
	answer: number[][],
): boolean => {
	if (answer.length === 0) {
		const low = edges.map(([a = 0, b = 0, w = 0]) => [a, b, w === -1 ? 1 : w]);
		const high = edges.map(([a = 0, b = 0, w = 0]) => [
			a,
			b,
			w === -1 ? 2e9 : w,
		]);
		return (
			shortest(n, low, source, destination) > target ||
			shortest(n, high, source, destination) < target
		);
	}
	return (
		answer.length === edges.length &&
		answer.every(([a, b, w = 0], i) => {
			const [x, y, original = 0] = edges[i] ?? [];
			return (
				a === x &&
				b === y &&
				(original === -1 ? w >= 1 && w <= 2e9 : w === original)
			);
		}) &&
		shortest(n, answer, source, destination) === target
	);
};

describe("2699. Modify Graph Edge Weights", () => {
	it("solves the examples from the problem statement", () => {
		const first = [
			[4, 1, -1],
			[2, 0, -1],
			[0, 3, -1],
			[4, 3, -1],
		];
		expect(
			isValid(5, first, 0, 1, 5, modifyGraphEdgeWeights(5, first, 0, 1, 5)),
		).toBe(true);
		expect(
			modifyGraphEdgeWeights(
				3,
				[
					[0, 1, -1],
					[0, 2, 5],
				],
				0,
				2,
				6,
			),
		).toEqual([]);
		const third = [
			[1, 0, 4],
			[1, 2, 3],
			[2, 3, 5],
			[0, 3, -1],
		];
		const answer = modifyGraphEdgeWeights(4, third, 0, 2, 6);
		expect(answer).not.toEqual([]);
		expect(isValid(4, third, 0, 2, 6, answer)).toBe(true);
	});

	it("gives valid answers on random graphs", () => {
		const random = createRandom(2699);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 6);
			const edges: number[][] = [];
			for (let a = 0; a < n; a++)
				for (let b = a + 1; b < n; b++)
					if (random.int(0, 1))
						edges.push([a, b, random.int(0, 2) ? random.int(1, 10) : -1]);
			const source = random.int(0, n - 1);
			const destination = (source + random.int(1, n - 1)) % n;
			const target = random.int(1, 25);
			const answer = modifyGraphEdgeWeights(
				n,
				edges,
				source,
				destination,
				target,
			);
			expect(isValid(n, edges, source, destination, target, answer)).toBe(true);
		}
	});
});
