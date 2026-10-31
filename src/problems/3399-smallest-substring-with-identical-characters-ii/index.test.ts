import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestSubstringWithIdenticalCharactersII as minLength } from ".";

/** Tries every set of flips. */
const byBruteForce = (s: string, numOps: number): number => {
	const n = s.length;
	let best = n;
	for (let mask = 0; mask < 1 << n; mask++) {
		if (mask.toString(2).replaceAll("0", "").length > numOps) continue;
		const t = [...s]
			.map((c, i) => ((mask >> i) & 1 ? (c === "0" ? "1" : "0") : c))
			.join("");
		let longest = 0;
		for (let i = 0, run = 0; i < n; i++) {
			run = i > 0 && t[i] === t[i - 1] ? run + 1 : 1;
			longest = Math.max(longest, run);
		}
		best = Math.min(best, longest);
	}
	return best;
};

describe("3399. Smallest Substring With Identical Characters II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minLength("000001", 1)).toBe(2);
		expect(minLength("0000", 2)).toBe(1);
		expect(minLength("0101", 0)).toBe(1);
	});

	it("matches trying every flip set on random strings", () => {
		const random = createRandom(3399);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 10), "01");
			const numOps = random.int(0, s.length);
			expect(minLength(s, numOps)).toBe(byBruteForce(s, numOps));
		}
	});
});
