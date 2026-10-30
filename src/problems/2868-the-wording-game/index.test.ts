import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theWordingGame as canAliceWin } from ".";

/** Full game-tree search. */
const byBruteForce = (a: string[], b: string[]): boolean => {
	const legal = (word: string, last: string): boolean => {
		const step = word.charCodeAt(0) - last.charCodeAt(0);
		return (step === 0 && word > last) || step === 1;
	};
	const wins = (mine: string[], theirs: string[], last: string): boolean =>
		mine.some((word) => legal(word, last) && !wins(theirs, mine, word));
	return !wins(b, a, a[0] ?? "");
};

describe("2868. The Wording Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(canAliceWin(["avokado", "dabar"], ["brazil"])).toBe(false);
		expect(
			canAliceWin(
				["ananas", "atlas", "banana"],
				["albatros", "cikla", "nogomet"],
			),
		).toBe(true);
		expect(canAliceWin(["hrvatska", "zastava"], ["bijeli", "galeb"])).toBe(
			true,
		);
	});

	it("matches a full game search on random word lists", () => {
		const random = createRandom(2868);
		for (let run = 0; run < 300; run++) {
			const words = [
				...new Set(
					Array.from({ length: random.int(2, 8) }, () =>
						random.string(random.int(1, 3), "abcd"),
					),
				),
			];
			const a: string[] = [];
			const b: string[] = [];
			for (const word of words) (random.int(0, 1) ? a : b).push(word);
			if (a.length === 0 || b.length === 0) continue;
			a.sort();
			b.sort();
			expect(canAliceWin(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
