import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestWordInDictionaryThroughDeleting as findLongestWord } from ".";

describe("524. Longest Word in Dictionary through Deleting", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findLongestWord("abpcplea", ["ale", "apple", "monkey", "plea"]),
		).toBe("apple");
		expect(findLongestWord("abpcplea", ["a", "b", "c"])).toBe("a");
		expect(findLongestWord("abc", ["d"])).toBe("");
	});

	it("matches filtering and sorting on random inputs", () => {
		const random = createRandom(524);
		const isSubsequence = (word: string, s: string) =>
			new RegExp([...word].join(".*")).test(s);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 10), "abc");
			const dictionary = Array.from({ length: random.int(1, 6) }, () =>
				random.string(random.int(1, 5), "abc"),
			);
			const expected =
				dictionary
					.filter((word) => isSubsequence(word, s))
					.sort(
						(a, b) => b.length - a.length || (a < b ? -1 : a > b ? 1 : 0),
					)[0] ?? "";
			expect(findLongestWord(s, dictionary)).toBe(expected);
		}
	});
});
