import { describe, expect, it } from "bun:test";
import { minimumBitFlipsToConvertNumber as minBitFlips } from ".";

describe("2220. Minimum Bit Flips to Convert Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(minBitFlips(10, 7)).toBe(3);
		expect(minBitFlips(3, 4)).toBe(3);
	});
});
