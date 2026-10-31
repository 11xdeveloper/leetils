import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findMaximumRemovalsFromSourceString as maxRemovals } from ".";

const isSubsequence = (pattern: string, text: string): boolean => {
	let j = 0;
	for (const c of text) if (c === pattern[j]) j++;
	return j === pattern.length;
};

/** Tries every subset of target indices. */
const byBruteForce = (
	source: string,
	pattern: string,
	targets: number[],
): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << targets.length; mask++) {
		const removed = new Set(targets.filter((_, i) => (mask >> i) & 1));
		const kept = [...source].filter((_, i) => !removed.has(i)).join("");
		if (isSubsequence(pattern, kept)) best = Math.max(best, removed.size);
	}
	return best;
};

describe("3316. Find Maximum Removals From Source String", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxRemovals("abbaa", "aba", [0, 1, 2])).toBe(1);
		expect(maxRemovals("bcda", "d", [0, 3])).toBe(2);
		expect(maxRemovals("dda", "dda", [0, 1, 2])).toBe(0);
		expect(maxRemovals("yeyeykyded", "yeyyd", [0, 2, 3, 4])).toBe(2);
	});

	it("matches trying every removal on random strings", () => {
		const random = createRandom(3316);
		for (let run = 0; run < 200; run++) {
			const source = random.string(random.int(2, 10), "ab");
			const pattern =
				[...source].filter(() => random.int(0, 1) === 1).join("") ||
				source.charAt(0);
			const targets = source
				.split("")
				.map((_, i) => i)
				.filter(() => random.int(0, 1) === 1);
			expect(maxRemovals(source, pattern, targets)).toBe(
				byBruteForce(source, pattern, targets),
			);
		}
	});
});
