import { describe, expect, it } from "bun:test";
import { countDistinctNumbersOnBoard as distinctIntegers } from ".";

describe("2549. Count Distinct Numbers on Board", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctIntegers(5)).toBe(4);
		expect(distinctIntegers(3)).toBe(2);
	});

	it("leaves 1 on its own", () => {
		expect(distinctIntegers(1)).toBe(1);
	});
});
