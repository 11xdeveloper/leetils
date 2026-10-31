import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { replaceQuestionMarksInStringToMinimizeItsValue as minimizeStringValue } from ".";

const value = (s: string): number => {
	const seen = new Map<string, number>();
	let total = 0;
	for (const char of s) {
		total += seen.get(char) ?? 0;
		seen.set(char, (seen.get(char) ?? 0) + 1);
	}
	return total;
};

/** Tries every replacement from a small alphabet. */
const byBruteForce = (s: string, alphabet: string): string => {
	let best = "";
	let bestValue = Number.POSITIVE_INFINITY;
	const fill = (prefix: string, i: number): void => {
		if (i === s.length) {
			const v = value(prefix);
			if (v < bestValue || (v === bestValue && prefix < best)) {
				best = prefix;
				bestValue = v;
			}
			return;
		}
		if (s[i] !== "?") fill(prefix + s[i], i + 1);
		else for (const char of alphabet) fill(prefix + char, i + 1);
	};
	fill("", 0);
	return best;
};

describe("3081. Replace Question Marks in String to Minimize Its Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeStringValue("???")).toBe("abc");
		expect(minimizeStringValue("a?a?")).toBe("abac");
	});

	it("matches trying every replacement on random strings", () => {
		const random = createRandom(3081);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 6), "abc???");
			const result = minimizeStringValue(s);
			// The answer never needs a letter beyond the first len(s) letters.
			expect(result).toBe(
				byBruteForce(s, "abcdef".slice(0, Math.max(3, s.length))),
			);
		}
	});
});
