import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { diagonalTraverse as findDiagonalOrder } from ".";

/** Walks the zigzag cell by cell, bouncing off the edges. */
const byWalking = (mat: number[][]): number[] => {
	const m = mat.length;
	const n = mat[0]?.length ?? 0;
	const order: number[] = [];
	let row = 0;
	let col = 0;
	let up = true;
	for (let i = 0; i < m * n; i++) {
		order.push(mat[row]?.[col] ?? 0);
		if (up) {
			if (col === n - 1) [row, up] = [row + 1, false];
			else if (row === 0) [col, up] = [col + 1, false];
			else [row, col] = [row - 1, col + 1];
		} else if (row === m - 1) [col, up] = [col + 1, true];
		else if (col === 0) [row, up] = [row + 1, true];
		else [row, col] = [row + 1, col - 1];
	}
	return order;
};

describe("498. Diagonal Traverse", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findDiagonalOrder([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toEqual([1, 2, 4, 7, 5, 3, 6, 8, 9]);
		expect(
			findDiagonalOrder([
				[1, 2],
				[3, 4],
			]),
		).toEqual([1, 2, 3, 4]);
	});

	it("matches walking the zigzag on random matrices", () => {
		const random = createRandom(498);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 6);
			const mat = Array.from({ length: random.int(1, 6) }, () =>
				random.array(cols, -9, 9),
			);
			expect(findDiagonalOrder(mat)).toEqual(byWalking(mat));
		}
	});
});
