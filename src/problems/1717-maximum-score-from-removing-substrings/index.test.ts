import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreFromRemovingSubstrings as maximumGain } from ".";

/** Tries every removal, memoised by the remaining string. */
const byBruteForce = (s: string, x: number, y: number): number => {
	const memo = new Map<string, number>();
	const best = (text: string): number => {
		const cached = memo.get(text);
		if (cached !== undefined) return cached;
		let result = 0;
		for (let i = 0; i + 1 < text.length; i++) {
			const pair = text.slice(i, i + 2);
			const score = pair === "ab" ? x : pair === "ba" ? y : 0;
			if (score > 0)
				result = Math.max(
					result,
					score + best(text.slice(0, i) + text.slice(i + 2)),
				);
		}
		memo.set(text, result);
		return result;
	};
	return best(s);
};

describe("1717. Maximum Score From Removing Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumGain("cdbcbbaaabab", 4, 5)).toBe(19);
		expect(maximumGain("aabbaaxybbaabb", 5, 4)).toBe(20);
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(1717);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 12), "abbac");
			const [x, y] = [random.int(1, 10), random.int(1, 10)];
			expect(maximumGain(s, x, y)).toBe(byBruteForce(s, x, y));
		}
	});
});
