import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cutOffTreesForGolfEvent as cutOffTree } from ".";

/** Floyd–Warshall over every cell, then the walk between trees in height order. */
const byAllPairs = (forest: number[][]): number => {
	const m = forest.length;
	const n = forest[0]?.length ?? 0;
	const cells = m * n;
	const dist = Array.from({ length: cells }, (_, i) =>
		Array.from({ length: cells }, (_, j) =>
			i === j ? 0 : Number.POSITIVE_INFINITY,
		),
	);
	for (let i = 0; i < cells; i++) {
		const [r, c] = [Math.floor(i / n), i % n];
		for (const [dr, dc] of [
			[1, 0],
			[0, 1],
			[-1, 0],
			[0, -1],
		] as const) {
			const [r2, c2] = [r + dr, c + dc];
			if (r2 < 0 || r2 >= m || c2 < 0 || c2 >= n || forest[r2]?.[c2] === 0)
				continue;
			(dist[i] ?? [])[r2 * n + c2] = 1;
		}
	}
	for (let k = 0; k < cells; k++) {
		for (let i = 0; i < cells; i++) {
			for (let j = 0; j < cells; j++) {
				const through = (dist[i]?.[k] ?? Infinity) + (dist[k]?.[j] ?? Infinity);
				if (through < (dist[i]?.[j] ?? Infinity)) (dist[i] ?? [])[j] = through;
			}
		}
	}
	const trees = forest
		.flatMap((row, r) =>
			row.flatMap((cell, c) => (cell > 1 ? [[cell, r * n + c]] : [])),
		)
		.sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	let total = 0;
	let at = 0;
	for (const [, cell = 0] of trees) {
		const steps = dist[at]?.[cell] ?? Infinity;
		if (steps === Infinity) return -1;
		total += steps;
		at = cell;
	}
	return total;
};

describe("675. Cut Off Trees for Golf Event", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			cutOffTree([
				[1, 2, 3],
				[0, 0, 4],
				[7, 6, 5],
			]),
		).toBe(6);
		expect(
			cutOffTree([
				[1, 2, 3],
				[0, 0, 0],
				[7, 6, 5],
			]),
		).toBe(-1);
		expect(
			cutOffTree([
				[2, 3, 4],
				[0, 0, 5],
				[8, 7, 6],
			]),
		).toBe(6);
	});

	it("matches all-pairs shortest paths on random forests", () => {
		const random = createRandom(675);
		for (let run = 0; run < 300; run++) {
			const cols = random.int(1, 5);
			const heights = Array.from({ length: 30 }, (_, i) => i + 2).sort(
				() => random.next() - 0.5,
			);
			const forest = Array.from({ length: random.int(1, 5) }, () =>
				Array.from({ length: cols }, () => {
					const kind = random.int(0, 3);
					return kind === 0 ? 0 : kind === 1 ? (heights.pop() ?? 1) : 1;
				}),
			);
			expect(cutOffTree(forest)).toBe(byAllPairs(forest));
		}
	});
});
