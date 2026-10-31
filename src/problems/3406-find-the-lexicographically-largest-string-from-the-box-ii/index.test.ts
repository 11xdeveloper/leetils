import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheLexicographicallyLargestStringFromTheBoxII as answerString } from ".";

/** Takes the best capped substring from every start. */
const byBruteForce = (word: string, numFriends: number): string => {
	if (numFriends === 1) return word;
	let best = "";
	for (let i = 0; i < word.length; i++) {
		const piece = word.slice(i, i + word.length - numFriends + 1);
		if (piece > best) best = piece;
	}
	return best;
};

describe("3406. Find the Lexicographically Largest String From the Box II", () => {
	it("solves the examples from the problem statement", () => {
		expect(answerString("dbca", 2)).toBe("dbc");
		expect(answerString("gggg", 4)).toBe("g");
	});

	it("matches trying every start on random words", () => {
		const random = createRandom(3406);
		for (let run = 0; run < 300; run++) {
			const word = random.string(random.int(1, 12), "abc");
			const numFriends = random.int(1, word.length);
			expect(answerString(word, numFriends)).toBe(
				byBruteForce(word, numFriends),
			);
		}
	});
});
