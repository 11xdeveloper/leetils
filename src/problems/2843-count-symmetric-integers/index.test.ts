import { describe, expect, it } from "bun:test";
import { countSymmetricIntegers } from ".";

describe("2843. Count Symmetric Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSymmetricIntegers(1, 100)).toBe(9);
		expect(countSymmetricIntegers(1200, 1230)).toBe(4);
	});
});
