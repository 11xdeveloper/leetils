import { describe, expect, it } from "bun:test";
import { spiralMatrix } from ".";

/** Walks the spiral step by step, turning right at walls and visited cells. */
const bySimulation = (matrix: number[][]): number[] => {
	const rows = matrix.length;
	const columns = matrix[0]?.length ?? 0;
	const visited = new Set<string>();
	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	] as const;
	const order: number[] = [];
	let [r, c, d] = [0, 0, 0];
	for (let step = 0; step < rows * columns; step++) {
		order.push(matrix[r]?.[c] ?? 0);
		visited.add(`${r},${c}`);
		const [dr, dc] = directions[d] ?? [0, 0];
		const [nr, nc] = [r + dr, c + dc];
		if (
			nr < 0 ||
			nr >= rows ||
			nc < 0 ||
			nc >= columns ||
			visited.has(`${nr},${nc}`)
		) {
			d = (d + 1) % 4;
		}
		const [tr, tc] = directions[d] ?? [0, 0];
		r += tr;
		c += tc;
	}
	return order;
};

describe("54. Spiral Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			spiralMatrix([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
		expect(
			spiralMatrix([
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
			]),
		).toEqual([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
	});

	it("handles a single row, a single column and a single cell", () => {
		expect(spiralMatrix([[1, 2, 3]])).toEqual([1, 2, 3]);
		expect(spiralMatrix([[1], [2], [3]])).toEqual([1, 2, 3]);
		expect(spiralMatrix([[7]])).toEqual([7]);
	});

	it("matches walking the spiral step by step for every shape up to 10×10", () => {
		for (let rows = 1; rows <= 10; rows++) {
			for (let columns = 1; columns <= 10; columns++) {
				const matrix = Array.from({ length: rows }, (_, r) =>
					Array.from({ length: columns }, (_, c) => r * columns + c),
				);
				expect(spiralMatrix(matrix)).toEqual(bySimulation(matrix));
			}
		}
	});
});
