import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeDuplicateLetters } from ".";

/** Every subsequence with each letter once, smallest first. */
const byBruteForce = (s: string): string => {
	const letters = new Set(s).size;
	let best: string | undefined;
	for (let mask = 0; mask < 1 << s.length; mask++) {
		const picked = [...s].filter((_, i) => mask & (1 << i)).join("");
		if (
			picked.length === letters &&
			new Set(picked).size === letters &&
			(best === undefined || picked < best)
		) {
			best = picked;
		}
	}
	return best ?? "";
};

describe("316. Remove Duplicate Letters", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeDuplicateLetters("bcabc")).toBe("abc");
		expect(removeDuplicateLetters("cbacdcbc")).toBe("acdb");
	});

	it("keeps a letter that doesn't appear again, even if it's large", () => {
		expect(removeDuplicateLetters("dab")).toBe("dab");
	});

	it("matches checking every subsequence on random inputs", () => {
		const random = createRandom(316);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "abcd");
			expect(removeDuplicateLetters(s)).toBe(byBruteForce(s));
		}
	});
});
