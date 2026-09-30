import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { verifyingAnAlienDictionary as isAlienSorted } from ".";

describe("953. Verifying an Alien Dictionary", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"),
		).toBeTrue();
		expect(
			isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz"),
		).toBeFalse();
		expect(
			isAlienSorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz"),
		).toBeFalse();
	});

	it("matches translating to the usual alphabet on random inputs", () => {
		const random = createRandom(953);
		const alphabet = "abcdefghijklmnopqrstuvwxyz";
		for (let run = 0; run < 500; run++) {
			const order = [...alphabet].sort(() => random.next() - 0.5).join("");
			const words = Array.from({ length: random.int(1, 6) }, () =>
				random.string(random.int(1, 4), "abc"),
			);
			const translated = words.map((word) =>
				[...word]
					.map((letter) => alphabet.charAt(order.indexOf(letter)))
					.join(""),
			);
			expect(isAlienSorted(words, order)).toBe(
				translated.every(
					(word, i) => i === 0 || (translated[i - 1] ?? "") <= word,
				),
			);
		}
	});
});
