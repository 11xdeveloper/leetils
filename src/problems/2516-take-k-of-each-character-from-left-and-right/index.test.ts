import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { takeKOfEachCharacterFromLeftAndRight as takeCharacters } from ".";

/** Tries every split between left and right takes. */
const byBruteForce = (s: string, k: number): number => {
	let best = -1;
	for (let left = 0; left <= s.length; left++)
		for (let right = 0; left + right <= s.length; right++) {
			const taken = s.slice(0, left) + s.slice(s.length - right);
			if ([..."abc"].every((c) => taken.split(c).length - 1 >= k))
				if (best === -1 || left + right < best) best = left + right;
		}
	return best;
};

describe("2516. Take K of Each Character From Left and Right", () => {
	it("solves the examples from the problem statement", () => {
		expect(takeCharacters("aabaaaacaabc", 2)).toBe(8);
		expect(takeCharacters("a", 1)).toBe(-1);
	});

	it("matches trying every split on random strings", () => {
		const random = createRandom(2516);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "abc");
			const k = random.int(0, 3);
			expect(takeCharacters(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
