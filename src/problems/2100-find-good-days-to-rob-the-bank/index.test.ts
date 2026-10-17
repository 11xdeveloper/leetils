import { describe, expect, it } from "bun:test";
import { findGoodDaysToRobTheBank as goodDaysToRobBank } from ".";

describe("2100. Find Good Days to Rob the Bank", () => {
	it("solves the examples from the problem statement", () => {
		expect(goodDaysToRobBank([5, 3, 3, 3, 5, 6, 2], 2)).toEqual([2, 3]);
		expect(goodDaysToRobBank([1, 1, 1, 1, 1], 0)).toEqual([0, 1, 2, 3, 4]);
		expect(goodDaysToRobBank([1, 2, 3, 4, 5, 6], 2)).toEqual([]);
	});
});
