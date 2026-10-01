import { describe, expect, it } from "bun:test";
import { checkIfTheSentenceIsPangram as checkIfPangram } from ".";

describe("1832. Check if the Sentence Is Pangram", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkIfPangram("thequickbrownfoxjumpsoverthelazydog")).toBeTrue();
		expect(checkIfPangram("leetcode")).toBeFalse();
	});
});
