import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToSeparateSentenceIntoRows as minimumCost } from ".";

/** Tries every way to break the words into rows. */
const byBruteForce = (sentence: string, k: number): number => {
	const words = sentence.split(" ");
	let best = Infinity;
	for (let mask = 0; mask < 1 << (words.length - 1); mask++) {
		const rows: string[][] = [[]];
		for (const [i, word] of words.entries()) {
			rows.at(-1)?.push(word);
			if (mask & (1 << i)) rows.push([]);
		}
		const lengths = rows.map((row) => row.join(" ").length);
		if (lengths.some((length) => length > k)) continue;
		best = Math.min(
			best,
			lengths.slice(0, -1).reduce((sum, length) => sum + (k - length) ** 2, 0),
		);
	}
	return best;
};

describe("2052. Minimum Cost to Separate Sentence Into Rows", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost("i love leetcode", 12)).toBe(36);
		expect(minimumCost("apples and bananas taste great", 7)).toBe(21);
		expect(minimumCost("a", 5)).toBe(0);
	});

	it("matches trying every split on random sentences", () => {
		const random = createRandom(2052);
		for (let run = 0; run < 300; run++) {
			const words = Array.from({ length: random.int(1, 8) }, () =>
				"a".repeat(random.int(1, 5)),
			);
			const k = random.int(5, 12);
			const sentence = words.join(" ");
			expect(minimumCost(sentence, k)).toBe(byBruteForce(sentence, k));
		}
	});
});
