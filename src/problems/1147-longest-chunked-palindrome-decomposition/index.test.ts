import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestChunkedPalindromeDecomposition as longestDecomposition } from ".";

/** Tries every matching prefix and suffix length. */
const byBruteForce = (text: string): number => {
	if (text === "") return 0;
	let best = 1;
	for (let length = 1; 2 * length <= text.length; length++) {
		if (text.slice(0, length) === text.slice(text.length - length)) {
			best = Math.max(
				best,
				2 + byBruteForce(text.slice(length, text.length - length)),
			);
		}
	}
	return best;
};

describe("1147. Longest Chunked Palindrome Decomposition", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestDecomposition("ghiabcdefhelloadamhelloabcdefghi")).toBe(7);
		expect(longestDecomposition("merchant")).toBe(1);
		expect(longestDecomposition("antaprezatepzapreanta")).toBe(11);
	});

	it("handles strings of length 1000", () => {
		expect(longestDecomposition("a".repeat(1000))).toBe(1000);
		expect(longestDecomposition("ab".repeat(500))).toBe(500);
		expect(longestDecomposition(`${"a".repeat(999)}b`)).toBe(1);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1147);
		for (let run = 0; run < 300; run++) {
			const half = random.string(random.int(0, 6), "ab");
			const text =
				random.next() < 0.5
					? half +
						random.string(random.int(0, 2), "ab") +
						[...half].reverse().join("")
					: random.string(random.int(1, 12), "ab");
			if (text === "") continue;
			expect(longestDecomposition(text)).toBe(byBruteForce(text));
		}
	});
});
