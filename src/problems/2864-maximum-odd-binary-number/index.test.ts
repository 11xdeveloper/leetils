import { describe, expect, it } from "bun:test";
import { maximumOddBinaryNumber } from ".";

describe("2864. Maximum Odd Binary Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumOddBinaryNumber("010")).toBe("001");
		expect(maximumOddBinaryNumber("0101")).toBe("1001");
	});
});
