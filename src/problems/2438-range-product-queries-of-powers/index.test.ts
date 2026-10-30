import { describe, expect, it } from "bun:test";
import { rangeProductQueriesOfPowers as productQueries } from ".";

describe("2438. Range Product Queries of Powers", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			productQueries(15, [
				[0, 1],
				[2, 2],
				[0, 3],
			]),
		).toEqual([2, 4, 64]);
		expect(productQueries(2, [[0, 0]])).toEqual([2]);
	});

	it("reduces large products", () => {
		// 2^(0 + 1 + … + 29) = 2^435.
		const expected = Number(2n ** 435n % 1_000_000_007n);
		expect(productQueries(2 ** 30 - 1, [[0, 29]])).toEqual([expected]);
	});
});
