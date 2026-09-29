import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ImplementTriePrefixTree } from ".";

describe("208. Implement Trie (Prefix Tree)", () => {
	it("solves the example from the problem statement", () => {
		const trie = new ImplementTriePrefixTree();
		trie.insert("apple");
		expect(trie.search("apple")).toBeTrue();
		expect(trie.search("app")).toBeFalse();
		expect(trie.startsWith("app")).toBeTrue();
		trie.insert("app");
		expect(trie.search("app")).toBeTrue();
	});

	it("does not find words that extend an inserted word", () => {
		const trie = new ImplementTriePrefixTree();
		trie.insert("a");
		expect(trie.search("ab")).toBeFalse();
		expect(trie.startsWith("ab")).toBeFalse();
	});

	it("matches a list of words on random operations", () => {
		const random = createRandom(208);
		for (let run = 0; run < 100; run++) {
			const trie = new ImplementTriePrefixTree();
			const words: string[] = [];
			for (let step = 0; step < 50; step++) {
				const word = random.string(random.int(1, 4), "ab");
				const action = random.int(0, 2);
				if (action === 0) {
					trie.insert(word);
					words.push(word);
				} else if (action === 1) {
					expect(trie.search(word)).toBe(words.includes(word));
				} else {
					expect(trie.startsWith(word)).toBe(
						words.some((w) => w.startsWith(word)),
					);
				}
			}
		}
	});
});
