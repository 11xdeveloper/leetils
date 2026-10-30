import { describe, expect, it } from "bun:test";
import { collectingChocolates as minCost } from ".";

describe("2735. Collecting Chocolates", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost([20, 1, 15], 5)).toBe(13);
		expect(minCost([1, 2, 3], 4)).toBe(6);
	});
});
