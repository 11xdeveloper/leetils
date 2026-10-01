import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { UniqueWordAbbreviation } from ".";

const abbreviate = (word: string): string =>
	word.length <= 2 ? word : `${word[0]}${word.length - 2}${word.at(-1)}`;

describe("288. Unique Word Abbreviation", () => {
	it("solves the example from the problem statement", () => {
		const abbreviations = new UniqueWordAbbreviation([
			"deer",
			"door",
			"cake",
			"card",
		]);
		expect(abbreviations.isUnique("dear")).toBeFalse();
		expect(abbreviations.isUnique("cart")).toBeTrue();
		expect(abbreviations.isUnique("cane")).toBeFalse();
		expect(abbreviations.isUnique("make")).toBeTrue();
		expect(abbreviations.isUnique("cake")).toBeTrue();
	});

	it("treats repeated dictionary words as one word", () => {
		expect(new UniqueWordAbbreviation(["a", "a"]).isUnique("a")).toBeTrue();
	});

	it("matches comparing against every dictionary word on random inputs", () => {
		const random = createRandom(288);
		for (let run = 0; run < 200; run++) {
			const dictionary = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 4), "ab"),
			);
			const abbreviations = new UniqueWordAbbreviation(dictionary);
			for (let query = 0; query < 10; query++) {
				const word = random.string(random.int(1, 4), "ab");
				const expected = dictionary.every(
					(w) => w === word || abbreviate(w) !== abbreviate(word),
				);
				expect(abbreviations.isUnique(word)).toBe(expected);
			}
		}
	});
});
