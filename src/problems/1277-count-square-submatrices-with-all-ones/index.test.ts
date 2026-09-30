import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSquareSubmatricesWithAllOnes as countSquares } from ".";

/** Checks every square. */
const byBruteForce = (matrix: number[][]): number => {
	let count = 0;
	for (let r = 0; r < matrix.length; r++) {
		for (let c = 0; c < (matrix[0]?.length ?? 0); c++) {
			for (
				let side = 1;
				matrix[r + side - 1]?.[c + side - 1] !== undefined;
				side++
			) {
				let full = true;
				for (let dr = 0; dr < side; dr++) {
					for (let dc = 0; dc < side; dc++)
						if (matrix[r + dr]?.[c + dc] !== 1) full = false;
				}
				if (full) count++;
			}
		}
	}
	return count;
};

describe("1277. Count Square Submatrices with All Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countSquares([
				[0, 1, 1, 1],
				[1, 1, 1, 1],
				[0, 1, 1, 1],
			]),
		).toBe(15);
		expect(
			countSquares([
				[1, 0, 1],
				[1, 1, 0],
				[1, 1, 0],
			]),
		).toBe(7);
	});

	it("matches checking every square on random matrices", () => {
		const random = createRandom(1277);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const matrix = Array.from({ length: m }, () =>
				Array.from({ length: n }, () => (random.next() < 0.75 ? 1 : 0)),
			);
			expect(countSquares(matrix)).toBe(byBruteForce(matrix));
		}
	});
});
