import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximalRectangle } from ".";

const parse = (rows: string[]): string[][] => rows.map((row) => row.split(""));

/** Checks every rectangle. */
const byBruteForce = (matrix: string[][]): number => {
	let largest = 0;
	const rows = matrix.length;
	const columns = matrix[0]?.length ?? 0;
	for (let top = 0; top < rows; top++) {
		for (let left = 0; left < columns; left++) {
			for (let bottom = top; bottom < rows; bottom++) {
				for (let right = left; right < columns; right++) {
					let allOnes = true;
					for (let r = top; r <= bottom && allOnes; r++) {
						for (let c = left; c <= right && allOnes; c++) {
							allOnes = matrix[r]?.[c] === "1";
						}
					}
					if (allOnes) {
						largest = Math.max(
							largest,
							(bottom - top + 1) * (right - left + 1),
						);
					}
				}
			}
		}
	}
	return largest;
};

describe("85. Maximal Rectangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximalRectangle(parse(["10100", "10111", "11111", "10010"]))).toBe(
			6,
		);
		expect(maximalRectangle(parse(["0"]))).toBe(0);
		expect(maximalRectangle(parse(["1"]))).toBe(1);
	});

	it("handles a matrix of only ones", () => {
		expect(maximalRectangle(parse(["111", "111"]))).toBe(6);
	});

	it("matches checking every rectangle on random matrices", () => {
		const random = createRandom(85);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 6);
			const matrix = Array.from({ length: random.int(1, 6) }, () =>
				random.string(columns, "011").split(""),
			);
			expect(maximalRectangle(matrix)).toBe(byBruteForce(matrix));
		}
	});
});
