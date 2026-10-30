import { describe, expect, it } from "bun:test";
import { maximumNumberOfIntegersToChooseFromARangeI as maxCount } from ".";

describe("2554. Maximum Number of Integers to Choose From a Range I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxCount([1, 6, 5], 5, 6)).toBe(2);
		expect(maxCount([1, 2, 3, 4, 5, 6, 7], 8, 1)).toBe(0);
		expect(maxCount([11], 7, 50)).toBe(7);
	});
});
