import { describe, expect, it } from "bun:test";
import { maximumOr } from ".";

describe("2680. Maximum OR", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumOr([12, 9], 1)).toBe(30);
		expect(maximumOr([8, 1, 2], 2)).toBe(35);
	});

	it("handles results past 32 bits", () => {
		expect(maximumOr([1_000_000_000, 1], 15)).toBe(1_000_000_000 * 2 ** 15 + 1);
	});
});
