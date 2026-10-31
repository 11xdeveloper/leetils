import { describe, expect, it } from "bun:test";
import { filterCharactersByFrequency as filterCharacters } from ".";

describe("3662. Filter Characters by Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(filterCharacters("aadbbcccca", 3)).toBe("dbb");
		expect(filterCharacters("xyz", 2)).toBe("xyz");
	});
});
