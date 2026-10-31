import { describe, expect, it } from "bun:test";
import { findTheNumberOfDistinctColorsAmongTheBalls as queryResults } from ".";

describe("3160. Find the Number of Distinct Colors Among the Balls", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			queryResults(4, [
				[1, 4],
				[2, 5],
				[1, 3],
				[3, 4],
			]),
		).toEqual([1, 2, 2, 3]);
		expect(
			queryResults(4, [
				[0, 1],
				[1, 2],
				[2, 2],
				[3, 4],
				[4, 5],
			]),
		).toEqual([1, 2, 2, 3, 4]);
	});
});
