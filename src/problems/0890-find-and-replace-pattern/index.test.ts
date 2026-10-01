import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAndReplacePattern } from ".";

describe("890. Find and Replace Pattern", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findAndReplacePattern(["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb"),
		).toEqual(["mee", "aqq"]);
		expect(findAndReplacePattern(["a", "b", "c"], "a")).toEqual([
			"a",
			"b",
			"c",
		]);
	});

	it("matches checking for a bijection on random words", () => {
		const random = createRandom(890);
		for (let run = 0; run < 500; run++) {
			const pattern = random.string(random.int(1, 5), "abc");
			const words = Array.from({ length: 6 }, () =>
				random.string(pattern.length, "xyz"),
			);
			const expected = words.filter((word) => {
				const forward = new Map<string, string>();
				const backward = new Map<string, string>();
				return [...word].every((char, i) => {
					const p = pattern.charAt(i);
					if (
						(forward.get(p) ?? char) !== char ||
						(backward.get(char) ?? p) !== p
					)
						return false;
					forward.set(p, char);
					backward.set(char, p);
					return true;
				});
			});
			expect(findAndReplacePattern(words, pattern)).toEqual(expected);
		}
	});
});
