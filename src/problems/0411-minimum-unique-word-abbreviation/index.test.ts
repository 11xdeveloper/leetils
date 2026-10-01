import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { generalizedAbbreviation } from "../0320-generalized-abbreviation";
import { validWordAbbreviation } from "../0408-valid-word-abbreviation";
import { minimumUniqueWordAbbreviation as minAbbreviation } from ".";

const lengthOf = (abbreviation: string): number =>
	abbreviation.replaceAll(/\d+/g, "#").length;

/** The shortest abbreviations of target that abbreviate no dictionary word. */
const shortestLength = (target: string, dictionary: string[]): number =>
	Math.min(
		...generalizedAbbreviation(target)
			.filter(
				(abbr) => !dictionary.some((word) => validWordAbbreviation(word, abbr)),
			)
			.map(lengthOf),
	);

describe("411. Minimum Unique Word Abbreviation", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAbbreviation("apple", ["blade"])).toBe("a4");
		expect(["1p3", "2p2", "3l1"]).toContain(
			minAbbreviation("apple", ["blade", "plain", "amber"]),
		);
	});

	it("abbreviates to a single number with no conflicting words", () => {
		expect(minAbbreviation("apple", [])).toBe("5");
		expect(minAbbreviation("apple", ["bat"])).toBe("5");
	});

	it("returns a shortest valid abbreviation on random inputs", () => {
		const random = createRandom(411);
		for (let run = 0; run < 200; run++) {
			const target = random.string(random.int(1, 6), "ab");
			const dictionary = [
				...new Set(
					Array.from({ length: random.int(0, 5) }, () =>
						random.string(random.int(1, 6), "ab"),
					),
				),
			].filter((word) => word !== target);
			const abbreviation = minAbbreviation(target, dictionary);
			expect(validWordAbbreviation(target, abbreviation)).toBeTrue();
			expect(
				dictionary.some((word) => validWordAbbreviation(word, abbreviation)),
			).toBeFalse();
			expect(lengthOf(abbreviation)).toBe(shortestLength(target, dictionary));
		}
	});
});
