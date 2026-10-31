import { describe, expect, it } from "bun:test";
import { firstElementWithUniqueFrequency as firstUniqueFreq } from ".";

describe("3843. First Element with Unique Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstUniqueFreq([20, 10, 30, 30])).toBe(30);
		expect(firstUniqueFreq([20, 20, 10, 30, 30, 30])).toBe(20);
		expect(firstUniqueFreq([10, 10, 20, 20])).toBe(-1);
	});
});
