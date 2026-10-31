import { describe, expect, it } from "bun:test";
import { sumOfMatrixAfterQueries as matrixSumQueries } from ".";

describe("2718. Sum of Matrix After Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			matrixSumQueries(3, [
				[0, 0, 1],
				[1, 2, 2],
				[0, 2, 3],
				[1, 0, 4],
			]),
		).toBe(23);
		expect(
			matrixSumQueries(3, [
				[0, 0, 4],
				[0, 1, 2],
				[1, 0, 1],
				[0, 2, 3],
				[1, 2, 1],
			]),
		).toBe(17);
	});
});
