import { describe, expect, it } from "bun:test";
import { reverseLettersThenSpecialCharactersInAString as reverseByType } from ".";

describe("3823. Reverse Letters Then Special Characters in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseByType(")ebc#da@f(")).toBe("(fad@cb#e)");
		expect(reverseByType("z")).toBe("z");
		expect(reverseByType("!@#$%^&*()")).toBe(")(*&^%$#@!");
	});
});
