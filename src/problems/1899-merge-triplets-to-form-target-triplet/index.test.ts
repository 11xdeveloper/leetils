import { describe, expect, it } from "bun:test";
import { mergeTripletsToFormTargetTriplet as mergeTriplets } from ".";

describe("1899. Merge Triplets to Form Target Triplet", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mergeTriplets(
				[
					[2, 5, 3],
					[1, 8, 4],
					[1, 7, 5],
				],
				[2, 7, 5],
			),
		).toBeTrue();
		expect(
			mergeTriplets(
				[
					[3, 4, 5],
					[4, 5, 6],
				],
				[3, 2, 5],
			),
		).toBeFalse();
		expect(
			mergeTriplets(
				[
					[2, 5, 3],
					[2, 3, 4],
					[1, 2, 5],
					[5, 2, 3],
				],
				[5, 5, 5],
			),
		).toBeTrue();
	});
});
