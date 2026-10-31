import { describe, expect, it } from "bun:test";
import { maximumBitwiseXorAfterRearrangement as maximumXor } from ".";

describe("3849. Maximum Bitwise XOR After Rearrangement", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumXor("101", "011")).toBe("110");
		expect(maximumXor("0110", "1110")).toBe("1101");
		expect(maximumXor("0101", "1001")).toBe("1111");
	});
});
