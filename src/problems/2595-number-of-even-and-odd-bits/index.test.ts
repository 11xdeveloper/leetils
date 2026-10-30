import { describe, expect, it } from "bun:test";
import { numberOfEvenAndOddBits as evenOddBit } from ".";

describe("2595. Number of Even and Odd Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(evenOddBit(50)).toEqual([1, 2]);
		expect(evenOddBit(2)).toEqual([0, 1]);
	});
});
