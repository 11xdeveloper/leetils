import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignAddAndSearchWordsDataStructure } from ".";

describe("211. Design Add and Search Words Data Structure", () => {
	it("solves the example from the problem statement", () => {
		const dictionary = new DesignAddAndSearchWordsDataStructure();
		dictionary.addWord("bad");
		dictionary.addWord("dad");
		dictionary.addWord("mad");
		expect(dictionary.search("pad")).toBeFalse();
		expect(dictionary.search("bad")).toBeTrue();
		expect(dictionary.search(".ad")).toBeTrue();
		expect(dictionary.search("b..")).toBeTrue();
	});

	it("only matches whole words", () => {
		const dictionary = new DesignAddAndSearchWordsDataStructure();
		dictionary.addWord("ab");
		expect(dictionary.search("a")).toBeFalse();
		expect(dictionary.search("...")).toBeFalse();
		expect(dictionary.search("..")).toBeTrue();
	});

	it("matches a regular expression over the added words on random operations", () => {
		const random = createRandom(211);
		for (let run = 0; run < 100; run++) {
			const dictionary = new DesignAddAndSearchWordsDataStructure();
			const words: string[] = [];
			for (let step = 0; step < 50; step++) {
				if (random.int(0, 1) === 0) {
					const word = random.string(random.int(1, 4), "ab");
					dictionary.addWord(word);
					words.push(word);
				} else {
					const pattern = random.string(random.int(1, 4), "ab.");
					const regex = new RegExp(`^${pattern}$`);
					expect(dictionary.search(pattern)).toBe(
						words.some((w) => regex.test(w)),
					);
				}
			}
		}
	});
});
