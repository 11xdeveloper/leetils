import { describe, expect, it } from "bun:test";
import { applyBitwiseOperationsToMakeStringsEqual as makeStringsEqual } from ".";

describe("2546. Apply Bitwise Operations to Make Strings Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeStringsEqual("1010", "0110")).toBe(true);
		expect(makeStringsEqual("11", "00")).toBe(false);
	});
});
