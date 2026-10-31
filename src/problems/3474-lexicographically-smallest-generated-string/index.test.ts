import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestGeneratedString as generateString } from ".";

/** Tries every string over a small alphabet in order. */
const byBruteForce = (str1: string, str2: string): string => {
	const n = str1.length;
	const m = str2.length;
	const length = n + m - 1;
	const alphabet = "abc";
	for (let code = 0; code < alphabet.length ** length; code++) {
		let word = "";
		for (
			let rest = code, i = 0;
			i < length;
			i++, rest = Math.floor(rest / alphabet.length)
		)
			word = alphabet.charAt(rest % alphabet.length) + word;
		let ok = true;
		for (let i = 0; i < n && ok; i++)
			ok = (word.slice(i, i + m) === str2) === (str1[i] === "T");
		if (ok) return word;
	}
	return "";
};

describe("3474. Lexicographically Smallest Generated String", () => {
	it("solves the examples from the problem statement", () => {
		expect(generateString("TFTF", "ab")).toBe("ababa");
		expect(generateString("TFTF", "abc")).toBe("");
		expect(generateString("F", "d")).toBe("a");
	});

	it("matches trying every string on random inputs", () => {
		const random = createRandom(3474);
		for (let run = 0; run < 200; run++) {
			const str1 = random.string(random.int(1, 4), "TF");
			const str2 = random.string(random.int(1, 3), "ab");
			expect(generateString(str1, str2)).toBe(byBruteForce(str1, str2));
		}
	});
});
