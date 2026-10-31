import { describe, expect, it } from "bun:test";
import { checkIfNumbersAreAscendingInASentence as areNumbersAscending } from ".";

describe("2042. Check if Numbers Are Ascending in a Sentence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			areNumbersAscending(
				"1 box has 3 blue 4 red 6 green and 12 yellow marbles",
			),
		).toBeTrue();
		expect(areNumbersAscending("hello world 5 x 5")).toBeFalse();
		expect(
			areNumbersAscending(
				"sunset is at 7 51 pm overnight lows will be in the low 50 and 60 s",
			),
		).toBeFalse();
	});
});
