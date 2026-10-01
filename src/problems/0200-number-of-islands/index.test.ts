import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfIslands } from ".";

const parse = (rows: string[]): string[][] => rows.map((row) => row.split(""));

/** Counts islands with union–find over adjacent land cells. */
const byUnionFind = (grid: string[][]): number => {
	const columns = grid[0]?.length ?? 0;
	const parent = new Map<number, number>();
	const find = (x: number): number => {
		const p = parent.get(x) ?? x;
		if (p === x) return x;
		const root = find(p);
		parent.set(x, root);
		return root;
	};
	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== "1") continue;
			const id = r * columns + c;
			parent.set(id, parent.get(id) ?? id);
			if (grid[r - 1]?.[c] === "1") parent.set(find(id), find(id - columns));
			if (row[c - 1] === "1") parent.set(find(id), find(id - 1));
		}
	}
	return new Set([...parent.keys()].map(find)).size;
};

describe("200. Number of Islands", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfIslands(parse(["11110", "11010", "11000", "00000"]))).toBe(
			1,
		);
		expect(numberOfIslands(parse(["11000", "11000", "00100", "00011"]))).toBe(
			3,
		);
	});

	it("doesn't connect land diagonally", () => {
		expect(numberOfIslands(parse(["10", "01"]))).toBe(2);
	});

	it("does not modify the grid", () => {
		const grid = parse(["110", "011"]);
		numberOfIslands(grid);
		expect(grid).toEqual(parse(["110", "011"]));
	});

	it("matches union–find on random grids", () => {
		const random = createRandom(200);
		for (let run = 0; run < 500; run++) {
			const width = random.int(1, 8);
			const grid = Array.from({ length: random.int(1, 8) }, () =>
				random.string(width, "01").split(""),
			);
			expect(numberOfIslands(grid)).toBe(byUnionFind(grid));
		}
	});
});
