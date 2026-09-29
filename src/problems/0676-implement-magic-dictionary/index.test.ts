import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ImplementMagicDictionary as MagicDictionary } from ".";

describe("676. Implement Magic Dictionary", () => {
	it("solves the example from the problem statement", () => {
		const dictionary = new MagicDictionary();
		dictionary.buildDict(["hello", "leetcode"]);
		expect(dictionary.search("hello")).toBeFalse();
		expect(dictionary.search("hhllo")).toBeTrue();
		expect(dictionary.search("hell")).toBeFalse();
		expect(dictionary.search("leetcoded")).toBeFalse();
	});

	it("matches counting differing letters on random dictionaries", () => {
		const random = createRandom(676);
		for (let run = 0; run < 200; run++) {
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 6) }, () =>
						random.string(random.int(1, 4), "ab"),
					),
				),
			];
			const dictionary = new MagicDictionary();
			dictionary.buildDict(words);
			for (let query = 0; query < 10; query++) {
				const word = random.string(random.int(1, 4), "ab");
				const expected = words.some(
					(stored) =>
						stored.length === word.length &&
						[...stored].filter((char, i) => char !== word.charAt(i)).length ===
							1,
				);
				expect(dictionary.search(word)).toBe(expected);
			}
		}
	});
});
