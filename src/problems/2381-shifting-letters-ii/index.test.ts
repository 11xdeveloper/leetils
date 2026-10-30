import { describe, expect, it } from "bun:test";
import { shiftingLettersII as shiftingLetters } from ".";

describe("2381. Shifting Letters II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shiftingLetters("abc", [
				[0, 1, 0],
				[1, 2, 1],
				[0, 2, 1],
			]),
		).toBe("ace");
		expect(
			shiftingLetters("dztz", [
				[0, 0, 0],
				[1, 1, 1],
			]),
		).toBe("catz");
	});
});
