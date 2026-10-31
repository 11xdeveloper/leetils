import { describe, expect, it } from "bun:test";
import { matrixSimilarityAfterCyclicShifts as areSimilar } from ".";

describe("2946. Matrix Similarity After Cyclic Shifts", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			areSimilar(
				[
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9],
				],
				4,
			),
		).toBe(false);
		expect(
			areSimilar(
				[
					[1, 2, 1, 2],
					[5, 5, 5, 5],
					[6, 3, 6, 3],
				],
				2,
			),
		).toBe(true);
		expect(
			areSimilar(
				[
					[2, 2],
					[2, 2],
				],
				3,
			),
		).toBe(true);
	});
});
