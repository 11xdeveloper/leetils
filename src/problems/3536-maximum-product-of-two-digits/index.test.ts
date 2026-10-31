import { describe, expect, it } from "bun:test";
import { maximumProductOfTwoDigits as maxProduct } from ".";

describe("3536. Maximum Product of Two Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct(31)).toBe(3);
		expect(maxProduct(22)).toBe(4);
		expect(maxProduct(124)).toBe(8);
	});
});
