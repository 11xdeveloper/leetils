import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theKWeakestRowsInAMatrix as kWeakestRows } from ".";

describe("1337. The K Weakest Rows in a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kWeakestRows(
				[
					[1, 1, 0, 0, 0],
					[1, 1, 1, 1, 0],
					[1, 0, 0, 0, 0],
					[1, 1, 0, 0, 0],
					[1, 1, 1, 1, 1],
				],
				3,
			),
		).toEqual([2, 0, 3]);
		expect(
			kWeakestRows(
				[
					[1, 0, 0, 0],
					[1, 1, 1, 1],
					[1, 0, 0, 0],
					[1, 0, 0, 0],
				],
				2,
			),
		).toEqual([0, 2]);
	});

	it("matches sorting by row sums on random matrices", () => {
		const random = createRandom(1337);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 6);
			const mat = Array.from({ length: random.int(2, 8) }, () => {
				const soldiers = random.int(0, n);
				return Array.from({ length: n }, (_, c): number =>
					c < soldiers ? 1 : 0,
				);
			});
			const k = random.int(1, mat.length);
			const sum = (i: number) => (mat[i] ?? []).reduce((s, x) => s + x, 0);
			const expected = mat
				.map((_, i) => i)
				.sort((a, b) => sum(a) - sum(b) || a - b)
				.slice(0, k);
			expect(kWeakestRows(mat, k)).toEqual(expected);
		}
	});
});
