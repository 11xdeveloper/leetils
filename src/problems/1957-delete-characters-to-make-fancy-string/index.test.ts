import { describe, expect, it } from "bun:test";
import { deleteCharactersToMakeFancyString as makeFancyString } from ".";

describe("1957. Delete Characters to Make Fancy String", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeFancyString("leeetcode")).toBe("leetcode");
		expect(makeFancyString("aaabaaaa")).toBe("aabaa");
		expect(makeFancyString("aab")).toBe("aab");
	});
});
