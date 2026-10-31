import { describe, expect, it } from "bun:test";
import { minimumElementAfterReplacementWithDigitSum as minElement } from ".";

describe("3300. Minimum Element After Replacement With Digit Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minElement([10, 12, 13, 14])).toBe(1);
		expect(minElement([1, 2, 3, 4])).toBe(1);
		expect(minElement([999, 19, 199])).toBe(10);
	});
});
