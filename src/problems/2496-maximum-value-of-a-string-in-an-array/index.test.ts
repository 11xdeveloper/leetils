import { describe, expect, it } from "bun:test";
import { maximumValueOfAStringInAnArray as maximumValue } from ".";

describe("2496. Maximum Value of a String in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumValue(["alic3", "bob", "3", "4", "00000"])).toBe(5);
		expect(maximumValue(["1", "01", "001", "0001"])).toBe(1);
	});
});
