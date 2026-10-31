import { describe, expect, it } from "bun:test";
import { neighboringBitwiseXor as doesValidArrayExist } from ".";

describe("2683. Neighboring Bitwise XOR", () => {
	it("solves the examples from the problem statement", () => {
		expect(doesValidArrayExist([1, 1, 0])).toBe(true);
		expect(doesValidArrayExist([1, 1])).toBe(true);
		expect(doesValidArrayExist([1, 0])).toBe(false);
	});
});
