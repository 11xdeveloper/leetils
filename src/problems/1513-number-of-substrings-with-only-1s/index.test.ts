import { describe, expect, it } from "bun:test";
import { numberOfSubstringsWithOnly1s as numSub } from ".";

describe("1513. Number of Substrings With Only 1s", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSub("0110111")).toBe(9);
		expect(numSub("101")).toBe(2);
		expect(numSub("111111")).toBe(21);
	});

	it("reduces modulo 10^9 + 7", () => {
		expect(numSub("1".repeat(100000))).toBe(
			((100000 * 100001) / 2) % 1_000_000_007,
		);
	});
});
