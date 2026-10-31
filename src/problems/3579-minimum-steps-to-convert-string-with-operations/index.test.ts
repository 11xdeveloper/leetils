import { describe, expect, it } from "bun:test";
import { minimumStepsToConvertStringWithOperations as minOperations } from ".";

describe("3579. Minimum Steps to Convert String with Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("abcdf", "dacbe")).toBe(4);
		expect(minOperations("abceded", "baecfef")).toBe(4);
		expect(minOperations("abcdef", "fedabc")).toBe(2);
	});

	it("needs nothing for equal strings", () => {
		expect(minOperations("abc", "abc")).toBe(0);
	});
});
