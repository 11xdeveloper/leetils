import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { canConvertStringInKMoves as canConvertString } from ".";

/** Assigns moves to positions greedily, move by move. */
const byBruteForce = (s: string, t: string, k: number): boolean => {
	if (s.length !== t.length) return false;
	const needed = [...s].map(
		(c, i) => (t.charCodeAt(i) - c.charCodeAt(0) + 26) % 26,
	);
	const done = needed.map((d) => d === 0);
	for (let move = 1; move <= k; move++) {
		const i = needed.findIndex((d, j) => !done[j] && d === move % 26);
		if (i !== -1) done[i] = true;
	}
	return done.every(Boolean);
};

describe("1540. Can Convert String in K Moves", () => {
	it("solves the examples from the problem statement", () => {
		expect(canConvertString("input", "ouput", 9)).toBeTrue();
		expect(canConvertString("abc", "bcd", 10)).toBeFalse();
		expect(canConvertString("aab", "bbb", 27)).toBeTrue();
	});

	it("rejects strings of different lengths", () => {
		expect(canConvertString("ab", "abc", 100)).toBeFalse();
	});

	it("matches assigning moves one by one on random inputs", () => {
		const random = createRandom(1540);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const [s, t] = [random.string(n, "abcz"), random.string(n, "abcz")];
			const k = random.int(0, 80);
			expect(canConvertString(s, t, k)).toBe(byBruteForce(s, t, k));
		}
	});
});
