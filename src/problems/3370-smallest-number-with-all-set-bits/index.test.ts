import { describe, expect, it } from "bun:test";
import { smallestNumberWithAllSetBits as smallestNumber } from ".";

describe("3370. Smallest Number With All Set Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestNumber(5)).toBe(7);
		expect(smallestNumber(10)).toBe(15);
		expect(smallestNumber(3)).toBe(3);
	});
});
