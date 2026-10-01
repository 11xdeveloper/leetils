import { describe, expect, it } from "bun:test";
import { minimumChangesToMakeAlternatingBinaryString as minOperations } from ".";

describe("1758. Minimum Changes To Make Alternating Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("0100")).toBe(1);
		expect(minOperations("10")).toBe(0);
		expect(minOperations("1111")).toBe(2);
	});
});
