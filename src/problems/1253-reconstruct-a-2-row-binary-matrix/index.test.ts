import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reconstructA2RowBinaryMatrix as reconstructMatrix } from ".";

const isValid = (
	upper: number,
	lower: number,
	colsum: number[],
	matrix: number[][],
) => {
	const [top = [], bottom = []] = matrix;
	const sum = (row: number[]) => row.reduce((total, bit) => total + bit, 0);
	return (
		top.length === colsum.length &&
		bottom.length === colsum.length &&
		[...top, ...bottom].every((bit) => bit === 0 || bit === 1) &&
		sum(top) === upper &&
		sum(bottom) === lower &&
		colsum.every((total, i) => (top[i] ?? 0) + (bottom[i] ?? 0) === total)
	);
};

/** Whether any matrix works, trying every top row. */
const anyValid = (upper: number, lower: number, colsum: number[]): boolean => {
	for (let mask = 0; mask < 2 ** colsum.length; mask++) {
		const top = colsum.map((_, i) => (mask >> i) & 1);
		const bottom = colsum.map((total, i) => total - (top[i] ?? 0));
		if (isValid(upper, lower, colsum, [top, bottom])) return true;
	}
	return false;
};

describe("1253. Reconstruct a 2-Row Binary Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isValid(2, 1, [1, 1, 1], reconstructMatrix(2, 1, [1, 1, 1])),
		).toBeTrue();
		expect(reconstructMatrix(2, 3, [2, 2, 1, 1])).toEqual([]);
		const colsum = [2, 1, 2, 0, 1, 0, 1, 2, 0, 1];
		expect(isValid(5, 5, colsum, reconstructMatrix(5, 5, colsum))).toBeTrue();
	});

	it("finds a matrix exactly when one exists on random inputs", () => {
		const random = createRandom(1253);
		for (let run = 0; run < 300; run++) {
			const colsum = random.array(random.int(1, 7), 0, 2);
			const [upper, lower] = [
				random.int(0, colsum.length),
				random.int(0, colsum.length),
			];
			const matrix = reconstructMatrix(upper, lower, colsum);
			if (matrix.length > 0)
				expect(isValid(upper, lower, colsum, matrix)).toBeTrue();
			else expect(anyValid(upper, lower, colsum)).toBeFalse();
		}
	});
});
