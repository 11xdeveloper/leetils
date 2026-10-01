import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestWordWithAllPrefixes as longestWord } from ".";

describe("1858. Longest Word With All Prefixes", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestWord(["k", "ki", "kir", "kira", "kiran"])).toBe("kiran");
		expect(
			longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"]),
		).toBe("apple");
		expect(longestWord(["abc", "bc", "ab", "qwe"])).toBe("");
	});

	it("matches checking every word's prefixes on random inputs", () => {
		const random = createRandom(1858);
		for (let run = 0; run < 300; run++) {
			const words = Array.from({ length: random.int(1, 10) }, () =>
				random.string(random.int(1, 3), "ab"),
			);
			const set = new Set(words);
			let best = "";
			for (const word of words) {
				const ok = Array.from({ length: word.length }, (_, i) =>
					word.slice(0, i + 1),
				).every((p) => set.has(p));
				if (
					ok &&
					(word.length > best.length ||
						(word.length === best.length && word < best))
				)
					best = word;
			}
			expect(longestWord(words)).toBe(best);
		}
	});
});
