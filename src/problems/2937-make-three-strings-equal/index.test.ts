import { describe, expect, it } from "bun:test";
import { makeThreeStringsEqual as findMinimumOperations } from ".";

describe("2937. Make Three Strings Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinimumOperations("abc", "abb", "ab")).toBe(2);
		expect(findMinimumOperations("dac", "bac", "cac")).toBe(-1);
	});
});
