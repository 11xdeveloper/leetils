import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { checkIfAnOriginalStringExistsGivenTwoEncodedStrings as possiblyEquals } from ".";

/** Encodes `s` by replacing random substrings of up to 9 letters with their lengths. */
const encode = (random: Random, s: string): string => {
	let encoded = "";
	let lastWasNumber = false;
	for (let i = 0; i < s.length; ) {
		const length = random.int(1, Math.min(9, s.length - i));
		if (!lastWasNumber && random.int(0, 1)) {
			encoded += String(length);
			lastWasNumber = true;
		} else {
			encoded += s.slice(i, i + length);
			lastWasNumber = false;
		}
		i += length;
	}
	return encoded;
};

describe("2060. Check if an Original String Exists Given Two Encoded Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(possiblyEquals("internationalization", "i18n")).toBeTrue();
		expect(possiblyEquals("l123e", "44")).toBeTrue();
		expect(possiblyEquals("a5b", "c5b")).toBeFalse();
	});

	it("reads digit runs as any split of numbers", () => {
		expect(possiblyEquals("112s", "g841")).toBeTrue();
		expect(possiblyEquals("ab", "a2")).toBeFalse();
		expect(possiblyEquals("1", "z")).toBeTrue();
		expect(possiblyEquals("99", "9a9")).toBeFalse();
	});

	it("accepts two random encodings of the same string", () => {
		const random = createRandom(2060);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 20), "ab");
			expect(possiblyEquals(encode(random, s), encode(random, s))).toBeTrue();
		}
	});
});
