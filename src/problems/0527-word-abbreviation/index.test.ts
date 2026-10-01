import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordAbbreviation as wordsAbbreviation } from ".";

/** Follows the rules literally: lengthen every clashing prefix until none clash. */
const bySimulation = (words: string[]): string[] => {
	const prefixes = words.map(() => 1);
	const abbreviate = (word: string, prefix: number) =>
		`${word.slice(0, prefix)}${word.length - prefix - 1}${word.at(-1)}`;
	for (;;) {
		const abbreviations = words.map((word, i) =>
			abbreviate(word, prefixes[i] ?? 1),
		);
		const clashing = abbreviations.map(
			(a) => abbreviations.filter((b) => a === b).length > 1,
		);
		if (!clashing.includes(true)) {
			return abbreviations.map((abbreviation, i) => {
				const word = words[i] ?? "";
				return abbreviation.length < word.length ? abbreviation : word;
			});
		}
		for (const [i, clash] of clashing.entries())
			if (clash) prefixes[i] = (prefixes[i] ?? 1) + 1;
	}
};

describe("527. Word Abbreviation", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			wordsAbbreviation([
				"like",
				"god",
				"internal",
				"me",
				"internet",
				"interval",
				"intension",
				"face",
				"intrusion",
			]),
		).toEqual([
			"l2e",
			"god",
			"internal",
			"me",
			"i6t",
			"interval",
			"inte4n",
			"f2e",
			"intr4n",
		]);
		expect(wordsAbbreviation(["aa", "aaa"])).toEqual(["aa", "aaa"]);
	});

	it("matches following the rules on random inputs", () => {
		const random = createRandom(527);
		for (let run = 0; run < 1000; run++) {
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 8) }, () =>
						random.string(random.int(2, 7), "ab"),
					),
				),
			];
			expect(wordsAbbreviation(words)).toEqual(bySimulation(words));
		}
	});
});
