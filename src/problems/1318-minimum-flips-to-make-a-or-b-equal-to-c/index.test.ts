import { describe, expect, it } from "bun:test";
import { minimumFlipsToMakeAOrBEqualToC as minFlips } from ".";

/** Tries every pair of values below 16, counting differing bits. */
const byBruteForce = (a: number, b: number, c: number): number => {
	const bits = (x: number) =>
		[...x.toString(2)].filter((d) => d === "1").length;
	let best = Infinity;
	for (let x = 0; x < 16; x++) {
		for (let y = 0; y < 16; y++) {
			if ((x | y) === c) best = Math.min(best, bits(x ^ a) + bits(y ^ b));
		}
	}
	return best;
};

describe("1318. Minimum Flips to Make a OR b Equal to c", () => {
	it("solves the examples from the problem statement", () => {
		expect(minFlips(2, 6, 5)).toBe(3);
		expect(minFlips(4, 2, 7)).toBe(1);
		expect(minFlips(1, 2, 3)).toBe(0);
	});

	it("handles values up to 10^9", () => {
		expect(minFlips(10 ** 9, 10 ** 9, 10 ** 9)).toBe(0);
		expect(minFlips(2 ** 29, 1, 1)).toBe(1);
	});

	it("matches trying every pair for 4-bit values", () => {
		for (let a = 1; a < 16; a++) {
			for (let b = 1; b < 16; b++) {
				for (let c = 1; c < 16; c++)
					expect(minFlips(a, b, c)).toBe(byBruteForce(a, b, c));
			}
		}
	});
});
