import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfDifferentSubsequencesGcds as countDifferentSubsequenceGCDs } from ".";

describe("1819. Number of Different Subsequences GCDs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDifferentSubsequenceGCDs([6, 10, 3])).toBe(5);
		expect(countDifferentSubsequenceGCDs([5, 15, 40, 5, 6])).toBe(7);
	});

	it("matches collecting every subsequence's gcd on random inputs", () => {
		const random = createRandom(1819);
		const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 60);
			let gcds = new Set<number>();
			for (const num of nums)
				gcds = new Set([...gcds, num, ...[...gcds].map((g) => gcd(g, num))]);
			expect(countDifferentSubsequenceGCDs(nums)).toBe(gcds.size);
		}
	});
});
