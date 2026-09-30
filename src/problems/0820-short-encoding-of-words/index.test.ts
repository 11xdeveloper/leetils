import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortEncodingOfWords as minimumLengthEncoding } from ".";

describe("820. Short Encoding of Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumLengthEncoding(["time", "me", "bell"])).toBe(10);
		expect(minimumLengthEncoding(["t"])).toBe(2);
	});

	it("matches keeping only words that aren't suffixes of others on random inputs", () => {
		const random = createRandom(820);
		for (let run = 0; run < 1000; run++) {
			const words = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 4), "ab"),
			);
			const unique = [...new Set(words)];
			const kept = unique.filter(
				(word) =>
					!unique.some((other) => other !== word && other.endsWith(word)),
			);
			expect(minimumLengthEncoding(words)).toBe(
				kept.reduce((total, word) => total + word.length + 1, 0),
			);
		}
	});
});
