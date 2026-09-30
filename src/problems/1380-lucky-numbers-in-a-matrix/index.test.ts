import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { luckyNumbersInAMatrix as luckyNumbers } from ".";

describe("1380. Lucky Numbers in a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			luckyNumbers([
				[3, 7, 8],
				[9, 11, 13],
				[15, 16, 17],
			]),
		).toEqual([15]);
		expect(
			luckyNumbers([
				[1, 10, 4, 2],
				[9, 3, 8, 7],
				[15, 16, 17, 12],
			]),
		).toEqual([12]);
		expect(
			luckyNumbers([
				[7, 8],
				[1, 2],
			]),
		).toEqual([7]);
	});

	it("matches checking every cell on random matrices", () => {
		const random = createRandom(1380);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 5), random.int(1, 5)];
			const values = Array.from({ length: m * n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			const matrix = Array.from({ length: m }, (_, r) =>
				values.slice(r * n, (r + 1) * n),
			);
			const expected = matrix.flatMap((row, r) =>
				row.filter(
					(value, c) =>
						value === Math.min(...row) &&
						matrix.every((other) => (other[c] ?? 0) <= value),
				),
			);
			expect(luckyNumbers(matrix).sort((a, b) => a - b)).toEqual(
				expected.sort((a, b) => a - b),
			);
		}
	});
});
