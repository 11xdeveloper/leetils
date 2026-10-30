import { describe, expect, it } from "bun:test";
import { buyTwoChocolates as buyChoco } from ".";

describe("2706. Buy Two Chocolates", () => {
	it("solves the examples from the problem statement", () => {
		expect(buyChoco([1, 2, 2], 3)).toBe(0);
		expect(buyChoco([3, 2, 3], 3)).toBe(3);
	});
});
