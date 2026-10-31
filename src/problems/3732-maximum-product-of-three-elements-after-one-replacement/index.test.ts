import { describe, expect, it } from "bun:test";
import { maximumProductOfThreeElementsAfterOneReplacement as maxProduct } from ".";

describe("3732. Maximum Product of Three Elements After One Replacement", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxProduct([-5, 7, 0])).toBe(3500000);
		expect(maxProduct([-4, -2, -1, -3])).toBe(1200000);
		expect(maxProduct([0, 10, 0])).toBe(0);
	});
});
