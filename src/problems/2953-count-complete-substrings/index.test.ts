import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countCompleteSubstrings } from ".";

/** Checks every substring. */
const byBruteForce = (word: string, k: number): number => {
	let total = 0;
	for (let i = 0; i < word.length; i++)
		for (let j = i + 1; j <= word.length; j++) {
			const sub = word.slice(i, j);
			const counts = new Map<string, number>();
			for (const c of sub) counts.set(c, (counts.get(c) ?? 0) + 1);
			const close = [...sub].every(
				(c, t) =>
					t === 0 || Math.abs(c.charCodeAt(0) - sub.charCodeAt(t - 1)) <= 2,
			);
			if (close && [...counts.values()].every((c) => c === k)) total++;
		}
	return total;
};

describe("2953. Count Complete Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCompleteSubstrings("igigee", 2)).toBe(3);
		expect(countCompleteSubstrings("aaabbbccc", 3)).toBe(6);
	});

	it("matches checking every substring on random words", () => {
		const random = createRandom(2953);
		for (let run = 0; run < 300; run++) {
			const word = random.string(random.int(1, 12), "abcdf");
			const k = random.int(1, 3);
			expect(countCompleteSubstrings(word, k)).toBe(byBruteForce(word, k));
		}
	});
});
