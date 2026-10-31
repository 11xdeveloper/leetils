import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTheNumberOfPartitionsAfterOperations as maxPartitions } from ".";

const partitions = (s: string, k: number): number => {
	let count = 0;
	let seen = new Set<string>();
	for (const char of s) {
		if (!seen.has(char) && seen.size === k) {
			count++;
			seen = new Set();
		}
		seen.add(char);
	}
	return count + 1;
};

/** Tries every single-letter change. */
const byBruteForce = (s: string, k: number): number => {
	let best = partitions(s, k);
	for (let i = 0; i < s.length; i++)
		for (const char of "abcdefghijklmnopqrstuvwxyz")
			best = Math.max(
				best,
				partitions(s.slice(0, i) + char + s.slice(i + 1), k),
			);
	return best;
};

describe("3003. Maximize the Number of Partitions After Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPartitions("accca", 2)).toBe(3);
		expect(maxPartitions("aabaab", 3)).toBe(1);
		expect(maxPartitions("xxyz", 1)).toBe(4);
	});

	it("matches trying every change on random strings", () => {
		const random = createRandom(3003);
		for (let run = 0; run < 300; run++) {
			const s = random.string(
				random.int(1, 10),
				"abcd".slice(0, random.int(1, 4)),
			);
			const k = random.int(1, 4);
			expect(maxPartitions(s, k)).toBe(byBruteForce(s, k));
		}
	});

	it("handles k = 26", () => {
		expect(maxPartitions("abcdefghijklmnopqrstuvwxyz", 26)).toBe(1);
		expect(maxPartitions("abcdefghijklmnopqrstuvwxyz", 25)).toBe(2);
	});
});
