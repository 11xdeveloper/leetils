import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subsequenceAfterOneReplacement as canMakeSubsequence } from ".";

/** Tries every replacement. */
const byBruteForce = (s: string, t: string): boolean => {
	const isSubsequence = (a: string) => {
		let k = 0;
		for (const c of t) if (c === a[k]) k++;
		return k === a.length;
	};
	if (isSubsequence(s)) return true;
	for (let i = 0; i < s.length; i++)
		for (const c of "abc")
			if (isSubsequence(s.slice(0, i) + c + s.slice(i + 1))) return true;
	return false;
};

describe("3983. Subsequence After One Replacement", () => {
	it("solves the examples from the problem statement", () => {
		expect(canMakeSubsequence("cat", "chat")).toBeTrue();
		expect(canMakeSubsequence("plane", "apple")).toBeFalse();
	});

	it("matches trying every replacement on random strings", () => {
		const random = createRandom(3983);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 6), "abc");
			const t = random.string(random.int(1, 8), "abc");
			expect(canMakeSubsequence(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
