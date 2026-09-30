import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { diagonalTraverseII as findDiagonalOrder } from ".";

/** Sorts every cell by diagonal, then by row descending. */
const byBruteForce = (nums: number[][]): number[] =>
	nums
		.flatMap((row, r) => row.map((value, c) => [r + c, -r, value] as const))
		.sort((a, b) => a[0] - b[0] || a[1] - b[1])
		.map(([, , value]) => value);

describe("1424. Diagonal Traverse II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findDiagonalOrder([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toEqual([1, 4, 2, 7, 5, 3, 8, 6, 9]);
		expect(
			findDiagonalOrder([
				[1, 2, 3, 4, 5],
				[6, 7],
				[8],
				[9, 10, 11],
				[12, 13, 14, 15, 16],
			]),
		).toEqual([1, 6, 2, 8, 7, 3, 9, 4, 12, 10, 5, 13, 11, 14, 15, 16]);
	});

	it("matches sorting cells on random jagged arrays", () => {
		const random = createRandom(1424);
		for (let run = 0; run < 200; run++) {
			const nums = Array.from({ length: random.int(1, 6) }, () =>
				random.array(random.int(1, 6), 1, 99),
			);
			expect(findDiagonalOrder(nums)).toEqual(byBruteForce(nums));
		}
	});
});
