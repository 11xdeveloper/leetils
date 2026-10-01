import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { triangle } from ".";

/** Tries every path. */
const byRecursion = (rows: number[][], r = 0, i = 0): number => {
	const value = rows[r]?.[i] ?? 0;
	if (r === rows.length - 1) return value;
	return (
		value +
		Math.min(byRecursion(rows, r + 1, i), byRecursion(rows, r + 1, i + 1))
	);
};

describe("120. Triangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(triangle([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])).toBe(11);
		expect(triangle([[-10]])).toBe(-10);
	});

	it("does not modify the input", () => {
		const rows = [[1], [2, 3]];
		triangle(rows);
		expect(rows).toEqual([[1], [2, 3]]);
	});

	it("matches trying every path on random triangles", () => {
		const random = createRandom(120);
		for (let run = 0; run < 300; run++) {
			const rows = Array.from({ length: random.int(1, 10) }, (_, r) =>
				random.array(r + 1, -9, 9),
			);
			expect(triangle(rows)).toBe(byRecursion(rows));
		}
	});
});
