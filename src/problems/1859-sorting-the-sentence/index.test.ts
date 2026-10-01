import { describe, expect, it } from "bun:test";
import { sortingTheSentence as sortSentence } from ".";

describe("1859. Sorting the Sentence", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortSentence("is2 sentence4 This1 a3")).toBe("This is a sentence");
		expect(sortSentence("Myself2 Me1 I4 and3")).toBe("Me Myself and I");
	});
});
