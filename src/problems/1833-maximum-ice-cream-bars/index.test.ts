import { describe, expect, it } from "bun:test";
import { maximumIceCreamBars as maxIceCream } from ".";

describe("1833. Maximum Ice Cream Bars", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxIceCream([1, 3, 2, 4, 1], 7)).toBe(4);
		expect(maxIceCream([10, 6, 8, 7, 7, 8], 5)).toBe(0);
		expect(maxIceCream([1, 6, 3, 1, 2, 5], 20)).toBe(6);
	});
});
