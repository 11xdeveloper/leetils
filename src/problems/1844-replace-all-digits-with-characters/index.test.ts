import { describe, expect, it } from "bun:test";
import { replaceAllDigitsWithCharacters as replaceDigits } from ".";

describe("1844. Replace All Digits with Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(replaceDigits("a1c1e1")).toBe("abcdef");
		expect(replaceDigits("a1b2c3d4e")).toBe("abbdcfdhe");
	});
});
