import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumValueSumByPlacingThreeRooksII as maximumValueSum } from ".";

/** Tries every placement. */
const byBruteForce = (board: number[][]): number => {
	const m = board.length;
	const n = board[0]?.length ?? 0;
	let best = Number.NEGATIVE_INFINITY;
	for (let r1 = 0; r1 < m; r1++)
		for (let r2 = r1 + 1; r2 < m; r2++)
			for (let r3 = r2 + 1; r3 < m; r3++)
				for (let c1 = 0; c1 < n; c1++)
					for (let c2 = 0; c2 < n; c2++)
						for (let c3 = 0; c3 < n; c3++)
							if (c1 !== c2 && c1 !== c3 && c2 !== c3)
								best = Math.max(
									best,
									(board[r1]?.[c1] ?? 0) +
										(board[r2]?.[c2] ?? 0) +
										(board[r3]?.[c3] ?? 0),
								);
	return best;
};

describe("3257. Maximum Value Sum by Placing Three Rooks II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumValueSum([
				[-3, 1, 1, 1],
				[-3, 1, -3, 1],
				[-3, 2, 1, 1],
			]),
		).toBe(4);
		expect(
			maximumValueSum([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toBe(15);
		expect(
			maximumValueSum([
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			]),
		).toBe(3);
	});

	it("matches trying every placement on random boards", () => {
		const random = createRandom(3257);
		for (let run = 0; run < 200; run++) {
			const m = random.int(3, 6);
			const n = random.int(3, 6);
			const board = Array.from({ length: m }, () => random.array(n, -5, 9));
			expect(maximumValueSum(board)).toBe(byBruteForce(board));
		}
	});
});
