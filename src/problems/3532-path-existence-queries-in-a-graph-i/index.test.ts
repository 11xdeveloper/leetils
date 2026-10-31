import { describe, expect, it } from "bun:test";
import { pathExistenceQueriesInAGraphI as pathExistenceQueries } from ".";

describe("3532. Path Existence Queries in a Graph I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			pathExistenceQueries(2, [1, 3], 1, [
				[0, 0],
				[0, 1],
			]),
		).toEqual([true, false]);
		expect(
			pathExistenceQueries(4, [2, 5, 6, 8], 2, [
				[0, 1],
				[0, 2],
				[1, 3],
				[2, 3],
			]),
		).toEqual([false, false, true, true]);
	});
});
