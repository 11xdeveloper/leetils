import { describe, expect, it } from "bun:test";
import { maximizeExpressionOfThreeElements as maximizeExpressionOfThree } from ".";

describe("3745. Maximize Expression of Three Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeExpressionOfThree([1, 4, 2, 5])).toBe(8);
		expect(maximizeExpressionOfThree([-2, 0, 5, -2, 4])).toBe(11);
	});
});
