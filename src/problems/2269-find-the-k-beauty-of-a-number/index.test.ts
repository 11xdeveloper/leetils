import { describe, expect, it } from "bun:test";
import { findTheKBeautyOfANumber as divisorSubstrings } from ".";

describe("2269. Find the K-Beauty of a Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(divisorSubstrings(240, 2)).toBe(2);
		expect(divisorSubstrings(430043, 2)).toBe(2);
	});
});
