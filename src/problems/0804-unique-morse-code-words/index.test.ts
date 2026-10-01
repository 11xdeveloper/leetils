import { describe, expect, it } from "bun:test";
import { uniqueMorseCodeWords as uniqueMorseRepresentations } from ".";

describe("804. Unique Morse Code Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"])).toBe(2);
		expect(uniqueMorseRepresentations(["a"])).toBe(1);
	});

	it("treats different words with the same code as one", () => {
		// "et" is ". -" and "a" is ".-".
		expect(uniqueMorseRepresentations(["et", "a", "n"])).toBe(2);
	});
});
