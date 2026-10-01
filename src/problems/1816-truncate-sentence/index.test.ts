import { describe, expect, it } from "bun:test";
import { truncateSentence } from ".";

describe("1816. Truncate Sentence", () => {
	it("solves the examples from the problem statement", () => {
		expect(truncateSentence("Hello how are you Contestant", 4)).toBe(
			"Hello how are you",
		);
		expect(truncateSentence("What is the solution to this problem", 4)).toBe(
			"What is the solution",
		);
		expect(truncateSentence("chopper is not a tanuki", 5)).toBe(
			"chopper is not a tanuki",
		);
	});
});
