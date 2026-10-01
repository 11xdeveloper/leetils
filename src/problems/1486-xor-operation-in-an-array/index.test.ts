import { describe, expect, it } from "bun:test";
import { xorOperationInAnArray as xorOperation } from ".";

describe("1486. XOR Operation in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(xorOperation(5, 0)).toBe(8);
		expect(xorOperation(4, 3)).toBe(8);
	});

	it("handles a single element", () => {
		expect(xorOperation(1, 7)).toBe(7);
	});
});
