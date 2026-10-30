import { describe, expect, it } from "bun:test";
import { addingSpacesToAString as addSpaces } from ".";

describe("2109. Adding Spaces to a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(addSpaces("LeetcodeHelpsMeLearn", [8, 13, 15])).toBe(
			"Leetcode Helps Me Learn",
		);
		expect(addSpaces("icodeinpython", [1, 5, 7, 9])).toBe("i code in py thon");
		expect(addSpaces("spacing", [0, 1, 2, 3, 4, 5, 6])).toBe(" s p a c i n g");
	});
});
