import { describe, expect, it } from "bun:test";
import { cycleLengthQueriesInATree as cycleLengthQueries } from ".";

describe("2509. Cycle Length Queries in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			cycleLengthQueries(3, [
				[5, 3],
				[4, 7],
				[2, 3],
			]),
		).toEqual([4, 5, 3]);
		expect(cycleLengthQueries(2, [[1, 2]])).toEqual([2]);
	});
});
