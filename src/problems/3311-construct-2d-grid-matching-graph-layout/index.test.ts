import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { construct2dGridMatchingGraphLayout as constructGridLayout } from ".";

/** Checks that the grid uses every node once and has exactly the graph's edges. */
const isLayout = (n: number, edges: number[][], grid: number[][]): boolean => {
	const cells = grid.flat();
	if (cells.length !== n || new Set(cells).size !== n) return false;
	const want = new Set(
		edges.map(([a = 0, b = 0]) => `${Math.min(a, b)},${Math.max(a, b)}`),
	);
	const got = new Set<string>();
	grid.forEach((row, r) => {
		row.forEach((a, c) => {
			for (const b of [row[c + 1], grid[r + 1]?.[c]])
				if (b !== undefined) got.add(`${Math.min(a, b)},${Math.max(a, b)}`);
		});
	});
	return want.size === got.size && [...want].every((e) => got.has(e));
};

describe("3311. Construct 2D Grid Matching Graph Layout", () => {
	it("solves the examples from the problem statement", () => {
		const cases: [number, number[][]][] = [
			[
				4,
				[
					[0, 1],
					[0, 2],
					[1, 3],
					[2, 3],
				],
			],
			[
				5,
				[
					[0, 1],
					[1, 3],
					[2, 3],
					[2, 4],
				],
			],
			[
				9,
				[
					[0, 1],
					[0, 4],
					[0, 5],
					[1, 7],
					[2, 3],
					[2, 4],
					[2, 5],
					[3, 6],
					[4, 6],
					[4, 7],
					[6, 8],
					[7, 8],
				],
			],
		];
		for (const [n, edges] of cases)
			expect(isLayout(n, edges, constructGridLayout(n, edges))).toBeTrue();
	});

	it("rebuilds random shuffled grids", () => {
		const random = createRandom(3311);
		for (let run = 0; run < 200; run++) {
			const rows = random.int(1, 5);
			const cols = random.int(rows === 1 ? 2 : 1, 5);
			const n = rows * cols;
			const label = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const edges: number[][] = [];
			for (let r = 0; r < rows; r++)
				for (let c = 0; c < cols; c++) {
					const id = label[r * cols + c] ?? 0;
					if (c + 1 < cols) edges.push([id, label[r * cols + c + 1] ?? 0]);
					if (r + 1 < rows) edges.push([id, label[(r + 1) * cols + c] ?? 0]);
				}
			expect(isLayout(n, edges, constructGridLayout(n, edges))).toBeTrue();
		}
	});
});
