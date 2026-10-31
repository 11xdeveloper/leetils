import { describe, expect, it } from "bun:test";
import { findTheXorOfNumbersWhichAppearTwice as duplicateNumbersXOR } from ".";

describe("3158. Find the XOR of Numbers Which Appear Twice", () => {
	it("solves the examples from the problem statement", () => {
		expect(duplicateNumbersXOR([1, 2, 1, 3])).toBe(1);
		expect(duplicateNumbersXOR([1, 2, 3])).toBe(0);
		expect(duplicateNumbersXOR([1, 2, 2, 1])).toBe(3);
	});
});
