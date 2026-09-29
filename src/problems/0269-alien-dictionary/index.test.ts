import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { alienDictionary } from ".";

/** Sorts words by the order of letters given in `order`. */
const sortBy = (words: string[], order: string): string[] => {
	const rank = (char: string) => order.indexOf(char);
	return words.toSorted((a, b) => {
		for (let i = 0; i < Math.min(a.length, b.length); i++) {
			if (a[i] !== b[i]) return rank(a.charAt(i)) - rank(b.charAt(i));
		}
		return a.length - b.length;
	});
};

describe("269. Alien Dictionary", () => {
	it("solves the examples from the problem statement", () => {
		expect(alienDictionary(["wrt", "wrf", "er", "ett", "rftt"])).toBe("wertf");
		expect(alienDictionary(["z", "x"])).toBe("zx");
		expect(alienDictionary(["z", "x", "z"])).toBe("");
	});

	it("rejects a word listed after a longer word it's a prefix of", () => {
		expect(alienDictionary(["abc", "ab"])).toBe("");
		expect(alienDictionary(["ab", "abc"])).not.toBe("");
	});

	it("includes letters that appear in no rule", () => {
		expect([...alienDictionary(["ab", "ad", "q"])].toSorted().join("")).toBe(
			"abdq",
		);
	});

	it("returns an order that sorts the words, for words sorted by a random order", () => {
		const random = createRandom(269);
		for (let run = 0; run < 300; run++) {
			const order = [..."abcdef"].toSorted(() => random.next() - 0.5).join("");
			const words = sortBy(
				Array.from({ length: random.int(1, 8) }, () =>
					random.string(random.int(1, 4), order),
				),
				order,
			);
			const found = alienDictionary(words);
			expect(found.length).toBe(new Set(words.join("")).size);
			expect(sortBy(words, found)).toEqual(words);
		}
	});
});
