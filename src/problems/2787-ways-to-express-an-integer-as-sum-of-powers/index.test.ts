import { describe, expect, it } from "bun:test";
import { waysToExpressAnIntegerAsSumOfPowers as numberOfWays } from ".";

describe("2787. Ways to Express an Integer as Sum of Powers", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays(10, 2)).toBe(1);
		expect(numberOfWays(4, 1)).toBe(2);
	});
});
