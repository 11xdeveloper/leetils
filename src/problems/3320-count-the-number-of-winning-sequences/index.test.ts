import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfWinningSequences as countWinningSequences } from ".";

/** Tries every sequence Bob could play. */
const byBruteForce = (s: string): number => {
	const beats = (a: number, b: number) => (a - b + 3) % 3 === 1;
	const count = (i: number, last: number, diff: number): number => {
		if (i === s.length) return diff > 0 ? 1 : 0;
		const alice = "FWE".indexOf(s.charAt(i));
		let total = 0;
		for (let bob = 0; bob < 3; bob++)
			if (bob !== last)
				total += count(
					i + 1,
					bob,
					diff + (beats(bob, alice) ? 1 : beats(alice, bob) ? -1 : 0),
				);
		return total;
	};
	return count(0, -1, 0);
};

describe("3320. Count The Number of Winning Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countWinningSequences("FFF")).toBe(3);
		expect(countWinningSequences("FWEFW")).toBe(18);
	});

	it("matches trying every sequence on random strings", () => {
		const random = createRandom(3320);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 9), "FWE");
			expect(countWinningSequences(s)).toBe(byBruteForce(s));
		}
	});
});
