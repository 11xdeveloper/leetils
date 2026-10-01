import { describe, expect, it } from "bun:test";
import { formArrayByConcatenatingSubarraysOfAnotherArray as canChoose } from ".";

describe("1764. Form Array by Concatenating Subarrays of Another Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canChoose(
				[
					[1, -1, -1],
					[3, -2, 0],
				],
				[1, -1, 0, 1, -1, -1, 3, -2, 0],
			),
		).toBeTrue();
		expect(
			canChoose(
				[
					[10, -2],
					[1, 2, 3, 4],
				],
				[1, 2, 3, 4, 10, -2],
			),
		).toBeFalse();
		expect(
			canChoose(
				[
					[1, 2, 3],
					[3, 4],
				],
				[7, 7, 1, 2, 3, 4, 7, 7],
			),
		).toBeFalse();
	});
});
