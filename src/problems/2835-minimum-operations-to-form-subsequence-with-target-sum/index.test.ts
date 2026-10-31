import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToFormSubsequenceWithTargetSum as minOperations } from ".";

/** Breadth-first search over multisets of pieces. */
const byBruteForce = (nums: number[], target: number): number => {
	const reachable = (pieces: number[]): boolean => {
		const sums = new Set([0]);
		for (const p of pieces) for (const s of [...sums]) sums.add(s + p);
		return sums.has(target);
	};
	let level = [nums.toSorted((a, b) => a - b)];
	const seen = new Set([level[0]?.join(",")]);
	for (let ops = 0; level.length > 0; ops++) {
		if (level.some(reachable)) return ops;
		const next: number[][] = [];
		for (const pieces of level)
			for (const [i, p] of pieces.entries()) {
				if (p === 1) continue;
				const split = [
					...pieces.slice(0, i),
					...pieces.slice(i + 1),
					p / 2,
					p / 2,
				].sort((a, b) => a - b);
				const key = split.join(",");
				if (!seen.has(key)) {
					seen.add(key);
					next.push(split);
				}
			}
		level = next;
	}
	return -1;
};

describe("2835. Minimum Operations to Form Subsequence With Target Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 2, 8], 7)).toBe(1);
		expect(minOperations([1, 32, 1, 2], 12)).toBe(2);
		expect(minOperations([1, 32, 1], 35)).toBe(-1);
	});

	it("matches a breadth-first search on random inputs", () => {
		const random = createRandom(2835);
		for (let run = 0; run < 200; run++) {
			const nums = Array.from(
				{ length: random.int(1, 4) },
				() => 2 ** random.int(0, 4),
			);
			const target = random.int(1, 40);
			expect(minOperations(nums, target)).toBe(byBruteForce(nums, target));
		}
	});
});
