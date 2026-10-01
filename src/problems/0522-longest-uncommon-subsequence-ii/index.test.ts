import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestUncommonSubsequenceII as findLUSlength } from ".";

const isSubsequence = (short: string, long: string): boolean => {
	let i = 0;
	for (const char of long) if (char === short.charAt(i)) i++;
	return i >= short.length;
};

/** Checks every subsequence of every string. */
const byBruteForce = (strs: string[]): number => {
	let best = -1;
	for (const [i, str] of strs.entries()) {
		for (let mask = 1; mask < 1 << str.length; mask++) {
			const sub = [...str].filter((_, k) => mask & (1 << k)).join("");
			if (
				sub.length > best &&
				strs.every((other, j) => i === j || !isSubsequence(sub, other))
			)
				best = sub.length;
		}
	}
	return best;
};

describe("522. Longest Uncommon Subsequence II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLUSlength(["aba", "cdc", "eae"])).toBe(3);
		expect(findLUSlength(["aaa", "aaa", "aa"])).toBe(-1);
	});

	it("matches checking every subsequence on random inputs", () => {
		const random = createRandom(522);
		for (let run = 0; run < 500; run++) {
			const strs = Array.from({ length: random.int(2, 5) }, () =>
				random.string(random.int(1, 5), "ab"),
			);
			expect(findLUSlength(strs)).toBe(byBruteForce(strs));
		}
	});
});
