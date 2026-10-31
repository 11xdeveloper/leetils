import { describe, expect, it } from "bun:test";
import { rearrangeCharactersToMakeTargetString as rearrangeCharacters } from ".";

describe("2287. Rearrange Characters to Make Target String", () => {
	it("solves the examples from the problem statement", () => {
		expect(rearrangeCharacters("ilovecodingonleetcode", "code")).toBe(2);
		expect(rearrangeCharacters("abcba", "abc")).toBe(1);
		expect(rearrangeCharacters("abbaccaddaeea", "aaaaa")).toBe(1);
	});
});
