import { describe, expect, it } from "bun:test";
import { vowelConsonantScore } from ".";

describe("3813. Vowel-Consonant Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(vowelConsonantScore("cooear")).toBe(2);
		expect(vowelConsonantScore("axeyizou")).toBe(1);
		expect(vowelConsonantScore("au 123")).toBe(0);
	});
});
