import { describe, expect, it } from "bun:test";
import { greatestEnglishLetterInUpperAndLowerCase as greatestLetter } from ".";

describe("2309. Greatest English Letter in Upper and Lower Case", () => {
	it("solves the examples from the problem statement", () => {
		expect(greatestLetter("lEeTcOdE")).toBe("E");
		expect(greatestLetter("arRAzFif")).toBe("R");
		expect(greatestLetter("AbCdEfGhIjK")).toBe("");
	});
});
