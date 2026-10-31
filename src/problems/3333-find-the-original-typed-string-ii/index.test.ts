import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheOriginalTypedStringII as possibleStringCount } from ".";

/** Tries every intended length for every run. */
const byBruteForce = (word: string, k: number): number => {
	const runs = word.match(/(.)\1*/g)?.map((run) => run.length) ?? [];
	const count = (i: number, length: number): number => {
		if (i === runs.length) return length >= k ? 1 : 0;
		let total = 0;
		for (let take = 1; take <= (runs[i] ?? 0); take++)
			total += count(i + 1, length + take);
		return total;
	};
	return count(0, 0);
};

describe("3333. Find the Original Typed String II", () => {
	it("solves the examples from the problem statement", () => {
		expect(possibleStringCount("aabbccdd", 7)).toBe(5);
		expect(possibleStringCount("aabbccdd", 8)).toBe(1);
		expect(possibleStringCount("aaabbb", 3)).toBe(8);
	});

	it("matches trying every length on random words", () => {
		const random = createRandom(3333);
		for (let run = 0; run < 200; run++) {
			const word = random.string(random.int(1, 10), "ab");
			const k = random.int(1, word.length);
			expect(possibleStringCount(word, k)).toBe(byBruteForce(word, k));
		}
	});
});
