import { describe, expect, it } from "bun:test";
import { permutations } from "../0046-permutations";
import { permutationsII } from ".";

/** All orderings with duplicates removed, sorted. */
const byDeduplicating = (nums: number[]): string[] =>
	[...new Set(permutations(nums).map((p) => p.join(",")))].toSorted();

describe("47. Permutations II", () => {
	it("solves the examples from the problem statement", () => {
		expect(permutationsII([1, 1, 2])).toEqual([
			[1, 1, 2],
			[1, 2, 1],
			[2, 1, 1],
		]);
		expect(permutationsII([1, 2, 3])).toEqual([
			[1, 2, 3],
			[1, 3, 2],
			[2, 1, 3],
			[2, 3, 1],
			[3, 1, 2],
			[3, 2, 1],
		]);
	});

	it("returns a single ordering when every value is the same", () => {
		expect(permutationsII([5, 5, 5, 5])).toEqual([[5, 5, 5, 5]]);
	});

	it("does not modify the input", () => {
		const nums = [2, 1, 1];
		permutationsII(nums);
		expect(nums).toEqual([2, 1, 1]);
	});

	it("matches deduplicating every ordering on random inputs", () => {
		let seed = 47;
		for (let run = 0; run < 100; run++) {
			const nums = Array.from({ length: 1 + (run % 7) }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return (seed % 3) - 1;
			});
			const results = permutationsII(nums).map((p) => p.join(","));
			// Already distinct and in order, so no sorting or deduplication needed.
			expect(results).toEqual(byDeduplicating(nums));
		}
	});
});
