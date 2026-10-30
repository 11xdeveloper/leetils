import { describe, expect, it } from "bun:test";
import { findMissingAndRepeatedValues } from ".";

describe("2965. Find Missing and Repeated Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMissingAndRepeatedValues([
				[1, 3],
				[2, 2],
			]),
		).toEqual([2, 4]);
		expect(
			findMissingAndRepeatedValues([
				[9, 1, 7],
				[8, 9, 2],
				[3, 4, 6],
			]),
		).toEqual([9, 5]);
	});
});
