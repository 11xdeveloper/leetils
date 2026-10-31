import { describe, expect, it } from "bun:test";
import { findTheNumberOfCopyArrays as countArrays } from ".";

describe("3468. Find the Number of Copy Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countArrays(
				[1, 2, 3, 4],
				[
					[1, 2],
					[2, 3],
					[3, 4],
					[4, 5],
				],
			),
		).toBe(2);
		expect(
			countArrays(
				[1, 2, 3, 4],
				[
					[1, 10],
					[2, 9],
					[3, 8],
					[4, 7],
				],
			),
		).toBe(4);
		expect(
			countArrays(
				[1, 2, 1, 2],
				[
					[1, 1],
					[2, 3],
					[3, 3],
					[2, 3],
				],
			),
		).toBe(0);
	});
});
