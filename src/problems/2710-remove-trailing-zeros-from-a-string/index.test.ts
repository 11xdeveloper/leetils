import { describe, expect, it } from "bun:test";
import { removeTrailingZerosFromAString as removeTrailingZeros } from ".";

describe("2710. Remove Trailing Zeros From a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeTrailingZeros("51230100")).toBe("512301");
		expect(removeTrailingZeros("123")).toBe("123");
	});
});
