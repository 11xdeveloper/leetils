import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToRevertWordToInitialStateI as minimumTimeToInitialState } from ".";

/** Checks each second's remainder with startsWith. */
const byBruteForce = (word: string, k: number): number => {
	for (let t = 1; ; t++)
		if (t * k >= word.length || word.startsWith(word.slice(t * k))) return t;
};

describe("3029. Minimum Time to Revert Word to Initial State I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTimeToInitialState("abacaba", 3)).toBe(2);
		expect(minimumTimeToInitialState("abacaba", 4)).toBe(1);
		expect(minimumTimeToInitialState("abcbabcd", 2)).toBe(4);
	});

	it("matches checking each second on random words", () => {
		const random = createRandom(3029);
		for (let run = 0; run < 300; run++) {
			const word = random.string(random.int(1, 15), "ab");
			const k = random.int(1, word.length);
			expect(minimumTimeToInitialState(word, k)).toBe(byBruteForce(word, k));
		}
	});
});
