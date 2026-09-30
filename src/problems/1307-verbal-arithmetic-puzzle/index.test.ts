import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { verbalArithmeticPuzzle as isSolvable } from ".";

/** Tries every assignment of distinct digits, checking the sum directly. */
const byBruteForce = (words: string[], result: string): boolean => {
	const letters = [...new Set([...words, result].join(""))];
	const digits = new Map<string, number>();
	const value = (word: string) =>
		Number([...word].map((char) => digits.get(char)).join(""));
	const valid = () =>
		[...words, result].every(
			(word) => word.length === 1 || digits.get(word[0] ?? "") !== 0,
		) && words.reduce((sum, word) => sum + value(word), 0) === value(result);
	const used = new Set<number>();
	const assign = (i: number): boolean => {
		const letter = letters[i];
		if (letter === undefined) return valid();
		for (let digit = 0; digit <= 9; digit++) {
			if (used.has(digit)) continue;
			used.add(digit);
			digits.set(letter, digit);
			if (assign(i + 1)) return true;
			used.delete(digit);
		}
		digits.delete(letter);
		return false;
	};
	return assign(0);
};

describe("1307. Verbal Arithmetic Puzzle", () => {
	it("solves the examples from the problem statement", () => {
		expect(isSolvable(["SEND", "MORE"], "MONEY")).toBeTrue();
		expect(isSolvable(["SIX", "SEVEN", "SEVEN"], "TWENTY")).toBeTrue();
		expect(isSolvable(["LEET", "CODE"], "POINT")).toBeFalse();
	});

	it("respects leading zeros but allows a lone zero", () => {
		expect(isSolvable(["A", "B"], "A")).toBeTrue();
		expect(isSolvable(["AB", "B"], "AB")).toBeTrue();
		expect(isSolvable(["BA", "A"], "BA")).toBeTrue();
		expect(isSolvable(["A", "A"], "BA")).toBeFalse();
	});

	it("handles ten letters", () => {
		expect(isSolvable(["THIS", "IS", "TOO"], "FUNNY")).toBeTrue();
		expect(isSolvable(["ABCDE", "FGHIJ"], "JIHGFE")).toBeFalse();
	});

	it("matches trying every assignment on random small puzzles", () => {
		const random = createRandom(1307);
		for (let run = 0; run < 100; run++) {
			const alphabet = "ABCDE";
			const words = Array.from({ length: random.int(2, 3) }, () =>
				random.string(random.int(1, 3), alphabet),
			);
			const result = random.string(random.int(1, 4), alphabet);
			expect(isSolvable(words, result)).toBe(byBruteForce(words, result));
		}
	});
});
