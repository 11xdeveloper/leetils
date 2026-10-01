import { describe, expect, it } from "bun:test";
import { determineIfStringHalvesAreAlike as halvesAreAlike } from ".";

describe("1704. Determine if String Halves Are Alike", () => {
	it("solves the examples from the problem statement", () => {
		expect(halvesAreAlike("book")).toBeTrue();
		expect(halvesAreAlike("textbook")).toBeFalse();
	});

	it("counts uppercase vowels", () => {
		expect(halvesAreAlike("AbCdEfGh")).toBeTrue();
		expect(halvesAreAlike("AEbc")).toBeFalse();
	});
});
