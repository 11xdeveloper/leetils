import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wordPatternII } from ".";

/** Tries every way of cutting s into pattern.length non-empty pieces. */
const byBruteForce = (pattern: string, s: string): boolean => {
	const cuts = (start: number, parts: number): string[][] => {
		if (parts === 1) return start < s.length ? [[s.slice(start)]] : [];
		const results: string[][] = [];
		for (let end = start + 1; end < s.length; end++) {
			for (const rest of cuts(end, parts - 1))
				results.push([s.slice(start, end), ...rest]);
		}
		return results;
	};
	return cuts(0, pattern.length).some((pieces) =>
		pieces.every((piece, i) =>
			pieces.every(
				(other, j) => (pattern[i] === pattern[j]) === (piece === other),
			),
		),
	);
};

describe("291. Word Pattern II", () => {
	it("solves the examples from the problem statement", () => {
		expect(wordPatternII("abab", "redblueredblue")).toBeTrue();
		expect(wordPatternII("aaaa", "asdasdasdasd")).toBeTrue();
		expect(wordPatternII("aabb", "xyzabcxzyabc")).toBeFalse();
	});

	it("doesn't let two letters stand for the same string", () => {
		expect(wordPatternII("ab", "aa")).toBeFalse();
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(291);
		for (let run = 0; run < 500; run++) {
			const pattern = random.string(random.int(1, 4), "ab");
			const s = random.string(random.int(pattern.length, 8), "xy");
			expect(wordPatternII(pattern, s)).toBe(byBruteForce(pattern, s));
		}
	});
});
