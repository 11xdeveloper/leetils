import { describe, expect, it } from "bun:test";
import { bitwiseOrOfEvenNumbersInAnArray as evenNumberBitwiseORs } from ".";

describe("3688. Bitwise OR of Even Numbers in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(evenNumberBitwiseORs([1, 2, 3, 4, 5, 6])).toBe(6);
		expect(evenNumberBitwiseORs([7, 9, 11])).toBe(0);
		expect(evenNumberBitwiseORs([1, 8, 16])).toBe(24);
	});
});
