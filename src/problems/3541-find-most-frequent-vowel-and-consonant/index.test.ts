import { describe, expect, it } from "bun:test";
import { findMostFrequentVowelAndConsonant as maxFreqSum } from ".";

describe("3541. Find Most Frequent Vowel and Consonant", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFreqSum("successes")).toBe(6);
		expect(maxFreqSum("aeiaeia")).toBe(3);
	});
});
