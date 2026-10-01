import { describe, expect, it } from "bun:test";
import { reversePrefixOfWord as reversePrefix } from ".";

describe("2000. Reverse Prefix of Word", () => {
	it("solves the examples from the problem statement", () => {
		expect(reversePrefix("abcdefd", "d")).toBe("dcbaefd");
		expect(reversePrefix("xyxzxe", "z")).toBe("zxyxxe");
		expect(reversePrefix("abcd", "z")).toBe("abcd");
	});
});
