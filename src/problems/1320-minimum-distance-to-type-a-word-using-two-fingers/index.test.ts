import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDistanceToTypeAWordUsingTwoFingers as minimumDistance } from ".";

/** Tries every assignment of letters to fingers. */
const byBruteForce = (word: string): number => {
	const distance = (a: number | undefined, b: number) =>
		a === undefined
			? 0
			: Math.abs(Math.floor(a / 6) - Math.floor(b / 6)) +
				Math.abs((a % 6) - (b % 6));
	let best = Infinity;
	for (let mask = 0; mask < 2 ** word.length; mask++) {
		const fingers: (number | undefined)[] = [undefined, undefined];
		let total = 0;
		[...word].forEach((char, i) => {
			const finger = (mask >> i) & 1;
			const key = char.charCodeAt(0) - 65;
			total += distance(fingers[finger], key);
			fingers[finger] = key;
		});
		best = Math.min(best, total);
	}
	return best;
};

describe("1320. Minimum Distance to Type a Word Using Two Fingers", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDistance("CAKE")).toBe(3);
		expect(minimumDistance("HAPPY")).toBe(6);
	});

	it("matches trying every finger assignment on random words", () => {
		const random = createRandom(1320);
		for (let run = 0; run < 200; run++) {
			const word = random.string(
				random.int(2, 10),
				"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			);
			expect(minimumDistance(word)).toBe(byBruteForce(word));
		}
	});
});
