import { describe, expect, it } from "bun:test";
import { minimumNumberOfFlipsToReverseBinaryString as minimumFlips } from ".";

describe("3750. Minimum Number of Flips to Reverse Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumFlips(7)).toBe(0);
		expect(minimumFlips(10)).toBe(4);
	});
});
