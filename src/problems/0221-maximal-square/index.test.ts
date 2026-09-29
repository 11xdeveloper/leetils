import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximalSquare } from ".";

const parse = (rows: string[]): string[][] => rows.map((row) => row.split(""));

/** Checks every square. */
const byBruteForce = (matrix: string[][]): number => {
	let largest = 0;
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < (matrix[0]?.length ?? 0); c++) {
			for (
				let size = 1;
				r + size <= matrix.length && c + size <= (matrix[0]?.length ?? 0);
				size++
			) {
				let allOnes = true;
				for (let i = 0; i < size && allOnes; i++) {
					for (let j = 0; j < size && allOnes; j++)
						allOnes = matrix[r + i]?.[c + j] === "1";
				}
				if (allOnes) largest = Math.max(largest, size * size);
			}
		}
	}
	return largest;
};

describe("221. Maximal Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximalSquare(parse(["10100", "10111", "11111", "10010"]))).toBe(4);
		expect(maximalSquare(parse(["01", "10"]))).toBe(1);
		expect(maximalSquare(parse(["0"]))).toBe(0);
	});

	it("matches checking every square on random matrices", () => {
		const random = createRandom(221);
		for (let run = 0; run < 500; run++) {
			const columns = random.int(1, 7);
			const matrix = Array.from({ length: random.int(1, 7) }, () =>
				random.string(columns, "0111").split(""),
			);
			expect(maximalSquare(matrix)).toBe(byBruteForce(matrix));
		}
	});
});
