import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromePartitioningIII as palindromePartition } from ".";

/** Tries every set of k − 1 cut positions. */
const byBruteForce = (s: string, k: number): number => {
	const changes = (t: string) => {
		let count = 0;
		for (let i = 0; i < t.length / 2; i++)
			if (t[i] !== t[t.length - 1 - i]) count++;
		return count;
	};
	let best = Infinity;
	for (let cuts = 0; cuts < 2 ** (s.length - 1); cuts++) {
		let pieces = 1;
		for (let rest = cuts; rest > 0; rest &= rest - 1) pieces++;
		if (pieces !== k) continue;
		let [total, start] = [0, 0];
		for (let i = 1; i <= s.length; i++) {
			if (i === s.length || cuts & (1 << (i - 1))) {
				total += changes(s.slice(start, i));
				start = i;
			}
		}
		best = Math.min(best, total);
	}
	return best;
};

describe("1278. Palindrome Partitioning III", () => {
	it("solves the examples from the problem statement", () => {
		expect(palindromePartition("abc", 2)).toBe(1);
		expect(palindromePartition("aabbc", 3)).toBe(0);
		expect(palindromePartition("leetcode", 8)).toBe(0);
	});

	it("handles a hundred characters", () => {
		expect(palindromePartition("ab".repeat(50), 1)).toBe(50);
		expect(palindromePartition("ab".repeat(50), 100)).toBe(0);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1278);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "abc");
			const k = random.int(1, s.length);
			expect(palindromePartition(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
