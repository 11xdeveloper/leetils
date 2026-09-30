import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { leftmostColumnWithAtLeastAOne as leftMostColumnWithOne } from ".";

const matrix = (mat: number[][]) => {
	const api = {
		reads: 0,
		get: (row: number, col: number) => {
			api.reads++;
			return mat[row]?.[col] ?? 0;
		},
		dimensions: () => [mat.length, mat[0]?.length ?? 0],
	};
	return api;
};

describe("1428. Leftmost Column with at Least a One", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			leftMostColumnWithOne(
				matrix([
					[0, 0],
					[1, 1],
				]),
			),
		).toBe(0);
		expect(
			leftMostColumnWithOne(
				matrix([
					[0, 0],
					[0, 1],
				]),
			),
		).toBe(1);
		expect(
			leftMostColumnWithOne(
				matrix([
					[0, 0],
					[0, 0],
				]),
			),
		).toBe(-1);
	});

	it("finds the column within 1000 reads on random 100 × 100 matrices", () => {
		const random = createRandom(1428);
		for (let run = 0; run < 100; run++) {
			const [rows, cols] = [random.int(1, 100), random.int(1, 100)];
			const mat = Array.from({ length: rows }, () => {
				const ones = random.next() < 0.3 ? 0 : random.int(0, cols);
				return Array.from({ length: cols }, (_, c) =>
					c >= cols - ones ? 1 : 0,
				);
			});
			const api = matrix(mat);
			const columns = mat.flatMap((row) =>
				row.includes(1) ? [row.indexOf(1)] : [],
			);
			expect(leftMostColumnWithOne(api)).toBe(
				columns.length > 0 ? Math.min(...columns) : -1,
			);
			expect(api.reads).toBeLessThanOrEqual(1000);
		}
	});
});
