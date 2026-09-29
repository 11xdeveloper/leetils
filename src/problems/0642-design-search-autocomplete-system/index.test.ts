import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignSearchAutocompleteSystem as AutocompleteSystem } from ".";

describe("642. Design Search Autocomplete System", () => {
	it("solves the example from the problem statement", () => {
		const system = new AutocompleteSystem(
			["i love you", "island", "iroman", "i love leetcode"],
			[5, 3, 2, 2],
		);
		expect(system.input("i")).toEqual([
			"i love you",
			"island",
			"i love leetcode",
		]);
		expect(system.input(" ")).toEqual(["i love you", "i love leetcode"]);
		expect(system.input("a")).toEqual([]);
		expect(system.input("#")).toEqual([]);
		expect(system.input("i")).toEqual([
			"i love you",
			"island",
			"i love leetcode",
		]);
		expect(system.input(" ")).toEqual(["i love you", "i love leetcode", "i a"]);
	});

	it("matches sorting every sentence on random sessions", () => {
		const random = createRandom(642);
		for (let run = 0; run < 100; run++) {
			const sentences = [
				...new Set(
					Array.from({ length: random.int(1, 8) }, () =>
						random.string(random.int(1, 4), "ab "),
					),
				),
			];
			const times = sentences.map(() => random.int(1, 3));
			const system = new AutocompleteSystem(sentences, times);
			const counts = new Map(
				sentences.map((sentence, i) => [sentence, times[i] ?? 0]),
			);
			for (let typedSentences = 0; typedSentences < 5; typedSentences++) {
				const sentence = random.string(random.int(1, 4), "ab ");
				for (let i = 0; i < sentence.length; i++) {
					const prefix = sentence.slice(0, i + 1);
					const expected = [...counts]
						.filter(([candidate]) => candidate.startsWith(prefix))
						.sort(([a, x], [b, y]) => y - x || (a < b ? -1 : 1))
						.slice(0, 3)
						.map(([candidate]) => candidate);
					expect(system.input(sentence.charAt(i))).toEqual(expected);
				}
				expect(system.input("#")).toEqual([]);
				counts.set(sentence, (counts.get(sentence) ?? 0) + 1);
			}
		}
	});
});
