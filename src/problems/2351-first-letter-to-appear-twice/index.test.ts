import { describe, expect, it } from "bun:test";
import { firstLetterToAppearTwice as repeatedCharacter } from ".";

describe("2351. First Letter to Appear Twice", () => {
	it("solves the examples from the problem statement", () => {
		expect(repeatedCharacter("abccbaacz")).toBe("c");
		expect(repeatedCharacter("abcdd")).toBe("d");
	});
});
