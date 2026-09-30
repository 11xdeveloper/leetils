import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { guessTheWord as findSecretWord } from ".";

/** A master that records the guesses made. */
const masterFor = (secret: string) => {
	const guesses: string[] = [];
	return {
		guesses,
		guess: (word: string) => {
			guesses.push(word);
			return [...word].filter((char, i) => char === secret.charAt(i)).length;
		},
	};
};

describe("843. Guess the Word", () => {
	it("solves the examples from the problem statement", () => {
		const master = masterFor("acckzz");
		findSecretWord(["acckzz", "ccbazz", "eiowzz", "abcczz"], master);
		expect(master.guesses.at(-1)).toBe("acckzz");
		expect(master.guesses.length).toBeLessThanOrEqual(10);

		const other = masterFor("hamada");
		findSecretWord(["hamada", "khaled"], other);
		expect(other.guesses.at(-1)).toBe("hamada");
	});

	it("finds every secret within 10 guesses in random word lists", () => {
		const random = createRandom(843);
		for (let run = 0; run < 30; run++) {
			const words = [
				...new Set(
					Array.from({ length: 100 }, () => random.string(6, "abcdefgh")),
				),
			];
			for (const secret of words.filter(() => random.int(0, 9) === 0)) {
				const master = masterFor(secret);
				findSecretWord(words, master);
				expect(master.guesses.at(-1)).toBe(secret);
				expect(master.guesses.length).toBeLessThanOrEqual(10);
			}
		}
	});
});
