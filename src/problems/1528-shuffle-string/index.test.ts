import { describe, expect, it } from "bun:test";
import { shuffleString as restoreString } from ".";

describe("1528. Shuffle String", () => {
	it("solves the examples from the problem statement", () => {
		expect(restoreString("codeleet", [4, 5, 6, 7, 0, 2, 1, 3])).toBe(
			"leetcode",
		);
		expect(restoreString("abc", [0, 1, 2])).toBe("abc");
	});

	it("reverses a string", () => {
		expect(restoreString("abcd", [3, 2, 1, 0])).toBe("dcba");
	});
});
