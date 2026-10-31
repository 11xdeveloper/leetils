import { describe, expect, it } from "bun:test";
import { lexicographicallySmallestStringAfterSubstringOperation as smallestString } from ".";

describe("2734. Lexicographically Smallest String After Substring Operation", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestString("cbabc")).toBe("baabc");
		expect(smallestString("acbbc")).toBe("abaab");
		expect(smallestString("leetcode")).toBe("kddsbncd");
	});

	it("turns the last letter of an all-a string into z", () => {
		expect(smallestString("aaa")).toBe("aaz");
	});
});
