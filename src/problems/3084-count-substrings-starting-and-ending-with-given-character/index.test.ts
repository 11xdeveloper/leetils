import { describe, expect, it } from "bun:test";
import { countSubstringsStartingAndEndingWithGivenCharacter as countSubstrings } from ".";

describe("3084. Count Substrings Starting and Ending with Given Character", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubstrings("abada", "a")).toBe(6);
		expect(countSubstrings("zzz", "z")).toBe(6);
	});
});
