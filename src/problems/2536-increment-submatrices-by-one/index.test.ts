import { describe, expect, it } from "bun:test";
import { incrementSubmatricesByOne as rangeAddQueries } from ".";

describe("2536. Increment Submatrices by One", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			rangeAddQueries(3, [
				[1, 1, 2, 2],
				[0, 0, 1, 1],
			]),
		).toEqual([
			[1, 1, 0],
			[1, 2, 1],
			[0, 1, 1],
		]);
		expect(rangeAddQueries(2, [[0, 0, 1, 1]])).toEqual([
			[1, 1],
			[1, 1],
		]);
	});
});
