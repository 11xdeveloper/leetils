import { describe, expect, it } from "bun:test";
import { checkIfAllCharactersHaveEqualNumberOfOccurrences as areOccurrencesEqual } from ".";

describe("1941. Check if All Characters Have Equal Number of Occurrences", () => {
	it("solves the examples from the problem statement", () => {
		expect(areOccurrencesEqual("abacbc")).toBeTrue();
		expect(areOccurrencesEqual("aaabb")).toBeFalse();
	});
});
