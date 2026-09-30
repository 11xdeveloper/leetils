import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestPlusSign as orderOfLargestPlusSign } from ".";

const byBruteForce = (n: number, mines: number[][]): number => {
	const isOne = (r: number, c: number) =>
		r >= 0 &&
		r < n &&
		c >= 0 &&
		c < n &&
		!mines.some(([mr, mc]) => mr === r && mc === c);
	let best = 0;
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			let order = 0;
			while (
				isOne(r - order, c) &&
				isOne(r + order, c) &&
				isOne(r, c - order) &&
				isOne(r, c + order)
			)
				order++;
			best = Math.max(best, order);
		}
	}
	return best;
};

describe("764. Largest Plus Sign", () => {
	it("solves the examples from the problem statement", () => {
		expect(orderOfLargestPlusSign(5, [[4, 2]])).toBe(2);
		expect(orderOfLargestPlusSign(1, [[0, 0]])).toBe(0);
	});

	it("matches growing arms from every cell on random grids", () => {
		const random = createRandom(764);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const mines = Array.from({ length: random.int(0, n * 2) }, () => [
				random.int(0, n - 1),
				random.int(0, n - 1),
			]);
			expect(orderOfLargestPlusSign(n, mines)).toBe(byBruteForce(n, mines));
		}
	});
});
