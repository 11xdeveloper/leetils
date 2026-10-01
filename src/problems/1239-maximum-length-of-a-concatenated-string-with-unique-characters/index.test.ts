import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumLengthOfAConcatenatedStringWithUniqueCharacters as maxLength } from ".";

/** Tries every subsequence of the strings. */
const byBruteForce = (arr: string[]): number => {
	let best = 0;
	for (let mask = 0; mask < 2 ** arr.length; mask++) {
		const joined = arr.filter((_, i) => mask & (1 << i)).join("");
		if (new Set(joined).size === joined.length)
			best = Math.max(best, joined.length);
	}
	return best;
};

describe("1239. Maximum Length of a Concatenated String with Unique Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxLength(["un", "iq", "ue"])).toBe(4);
		expect(maxLength(["cha", "r", "act", "ers"])).toBe(6);
		expect(maxLength(["abcdefghijklmnopqrstuvwxyz"])).toBe(26);
	});

	it("skips strings with repeated letters", () => {
		expect(maxLength(["aa", "bb"])).toBe(0);
		expect(maxLength(["aa", "b"])).toBe(1);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1239);
		for (let run = 0; run < 200; run++) {
			const arr = Array.from({ length: random.int(1, 10) }, () =>
				random.string(random.int(1, 4), "abcdefgh"),
			);
			expect(maxLength(arr)).toBe(byBruteForce(arr));
		}
	});
});
