import { describe, expect, it } from "bun:test";
import { determineWhetherMatrixCanBeObtainedByRotation as findRotation } from ".";

describe("1886. Determine Whether Matrix Can Be Obtained By Rotation", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findRotation(
				[
					[0, 1],
					[1, 0],
				],
				[
					[1, 0],
					[0, 1],
				],
			),
		).toBeTrue();
		expect(
			findRotation(
				[
					[0, 1],
					[1, 1],
				],
				[
					[1, 0],
					[0, 1],
				],
			),
		).toBeFalse();
		expect(
			findRotation(
				[
					[0, 0, 0],
					[0, 1, 0],
					[1, 1, 1],
				],
				[
					[1, 1, 1],
					[0, 1, 0],
					[0, 0, 0],
				],
			),
		).toBeTrue();
	});

	it("accepts each quarter turn", () => {
		expect(
			findRotation(
				[
					[1, 2],
					[3, 4],
				],
				[
					[3, 1],
					[4, 2],
				],
			),
		).toBeTrue();
		expect(
			findRotation(
				[
					[1, 2],
					[3, 4],
				],
				[
					[2, 4],
					[1, 3],
				],
			),
		).toBeTrue();
	});
});
