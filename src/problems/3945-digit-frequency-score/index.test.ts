import { describe, expect, it } from "bun:test";
import { digitFrequencyScore } from ".";

describe("3945. Digit Frequency Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(digitFrequencyScore(122)).toBe(5);
		expect(digitFrequencyScore(101)).toBe(2);
	});
});
