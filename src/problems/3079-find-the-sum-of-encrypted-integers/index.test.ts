import { describe, expect, it } from "bun:test";
import { findTheSumOfEncryptedIntegers as sumOfEncryptedInt } from ".";

describe("3079. Find the Sum of Encrypted Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfEncryptedInt([1, 2, 3])).toBe(6);
		expect(sumOfEncryptedInt([10, 21, 31])).toBe(66);
	});
});
