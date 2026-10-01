import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromePartitioning } from "../0131-palindrome-partitioning";
import { palindromePartitioningII } from ".";

describe("132. Palindrome Partitioning II", () => {
	it("solves the examples from the problem statement", () => {
		expect(palindromePartitioningII("aab")).toBe(1);
		expect(palindromePartitioningII("a")).toBe(0);
		expect(palindromePartitioningII("ab")).toBe(1);
	});

	it("needs no cuts for a palindrome", () => {
		expect(palindromePartitioningII("racecar")).toBe(0);
	});

	it("needs n - 1 cuts when no two characters match", () => {
		expect(palindromePartitioningII("abcdef")).toBe(5);
	});

	it("handles the constraint of 2000 characters", () => {
		expect(palindromePartitioningII("ab".repeat(1000))).toBe(1);
	});

	it("matches the fewest parts from Palindrome Partitioning on random inputs", () => {
		const random = createRandom(132);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "ab");
			const fewestParts = Math.min(
				...palindromePartitioning(s).map((parts) => parts.length),
			);
			expect(palindromePartitioningII(s)).toBe(fewestParts - 1);
		}
	});
});
