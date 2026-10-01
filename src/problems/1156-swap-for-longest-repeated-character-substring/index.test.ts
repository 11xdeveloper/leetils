import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { swapForLongestRepeatedCharacterSubstring as maxRepOpt1 } from ".";

/** Tries every swap, measuring the longest run each time. */
const byBruteForce = (text: string): number => {
	const longestRun = (s: string) =>
		Math.max(...(s.match(/(.)\1*/g) ?? []).map((run) => run.length));
	let best = longestRun(text);
	for (let i = 0; i < text.length; i++) {
		for (let j = i + 1; j < text.length; j++) {
			const chars = [...text];
			[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
			best = Math.max(best, longestRun(chars.join("")));
		}
	}
	return best;
};

describe("1156. Swap For Longest Repeated Character Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxRepOpt1("ababa")).toBe(3);
		expect(maxRepOpt1("aaabaaa")).toBe(6);
		expect(maxRepOpt1("aaaaa")).toBe(5);
	});

	it("uses a third copy to join two runs completely", () => {
		expect(maxRepOpt1("aabaaca")).toBe(5);
		expect(maxRepOpt1("aaabbaaa")).toBe(4);
	});

	it("matches trying every swap on random inputs", () => {
		const random = createRandom(1156);
		for (let run = 0; run < 400; run++) {
			const text = random.string(
				random.int(1, 10),
				"abc".slice(0, random.int(1, 3)),
			);
			expect(maxRepOpt1(text)).toBe(byBruteForce(text));
		}
	});
});
