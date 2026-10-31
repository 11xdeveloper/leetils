import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfSubsequencesAfterOneInserting as numOfSubsequences } from ".";

const countLct = (s: string): number => {
	let [l, lc, lct] = [0, 0, 0];
	for (const c of s) {
		if (c === "L") l++;
		else if (c === "C") lc += l;
		else if (c === "T") lct += lc;
	}
	return lct;
};

/** Tries every insertion. */
const byBruteForce = (s: string): number => {
	let best = countLct(s);
	for (let i = 0; i <= s.length; i++)
		for (const c of "LCT")
			best = Math.max(best, countLct(s.slice(0, i) + c + s.slice(i)));
	return best;
};

describe("3628. Maximum Number of Subsequences After One Inserting", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfSubsequences("LMCT")).toBe(2);
		expect(numOfSubsequences("LCCT")).toBe(4);
		expect(numOfSubsequences("L")).toBe(0);
	});

	it("matches trying every insertion on random strings", () => {
		const random = createRandom(3628);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "LCTX");
			expect(numOfSubsequences(s)).toBe(byBruteForce(s));
		}
	});
});
