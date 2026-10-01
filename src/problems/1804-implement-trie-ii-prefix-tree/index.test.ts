import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ImplementTrieIIPrefixTree as Trie } from ".";

describe("1804. Implement Trie II (Prefix Tree)", () => {
	it("solves the example from the problem statement", () => {
		const trie = new Trie();
		trie.insert("apple");
		trie.insert("apple");
		expect(trie.countWordsEqualTo("apple")).toBe(2);
		expect(trie.countWordsStartingWith("app")).toBe(2);
		trie.erase("apple");
		expect(trie.countWordsEqualTo("apple")).toBe(1);
		expect(trie.countWordsStartingWith("app")).toBe(1);
		trie.erase("apple");
		expect(trie.countWordsStartingWith("app")).toBe(0);
	});

	it("matches a list of words on random operations", () => {
		const random = createRandom(1804);
		for (let run = 0; run < 30; run++) {
			const trie = new Trie();
			const words: string[] = [];
			for (let op = 0; op < 300; op++) {
				const word = random.string(random.int(1, 4), "ab");
				switch (random.int(0, 3)) {
					case 0:
						trie.insert(word);
						words.push(word);
						break;
					case 1: {
						const existing = words[random.int(0, words.length - 1)];
						if (existing === undefined) break;
						trie.erase(existing);
						words.splice(words.indexOf(existing), 1);
						break;
					}
					case 2:
						expect(trie.countWordsEqualTo(word)).toBe(
							words.filter((w) => w === word).length,
						);
						break;
					default:
						expect(trie.countWordsStartingWith(word)).toBe(
							words.filter((w) => w.startsWith(word)).length,
						);
				}
			}
		}
	});
});
