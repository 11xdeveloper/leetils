import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { PrefixAndSuffixSearch as WordFilter } from ".";

describe("745. Prefix and Suffix Search", () => {
	it("solves the example from the problem statement", () => {
		expect(new WordFilter(["apple"]).f("a", "e")).toBe(0);
	});

	it("matches scanning every word on random inputs", () => {
		const random = createRandom(745);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 5), "ab"),
			);
			const filter = new WordFilter(words);
			for (let query = 0; query < 10; query++) {
				const pref = random.string(random.int(1, 3), "ab");
				const suff = random.string(random.int(1, 3), "ab");
				const expected = words.findLastIndex(
					(word) => word.startsWith(pref) && word.endsWith(suff),
				);
				expect(filter.f(pref, suff)).toBe(expected);
			}
		}
	});
});
