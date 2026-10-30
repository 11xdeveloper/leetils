import { describe, expect, it } from "bun:test";
import { makeNumberOfDistinctCharactersEqual as isItPossible } from ".";

describe("2531. Make Number of Distinct Characters Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(isItPossible("ac", "b")).toBe(false);
		expect(isItPossible("abcc", "aab")).toBe(true);
		expect(isItPossible("abcde", "fghij")).toBe(true);
	});
});
