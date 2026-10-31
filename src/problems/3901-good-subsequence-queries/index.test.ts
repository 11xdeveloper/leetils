import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { goodSubsequenceQueries as countGoodSubseq } from ".";

/** Tries every proper subsequence after each update. */
const byBruteForce = (
	nums: number[],
	p: number,
	queries: number[][],
): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const values = [...nums];
	let good = 0;
	for (const [i = 0, v = 0] of queries) {
		values[i] = v;
		let found = false;
		for (let mask = 1; mask < (1 << values.length) - 1 && !found; mask++)
			if (
				values.reduce((g, x, j) => ((mask >> j) & 1 ? gcd(g, x) : g), 0) === p
			)
				found = true;
		if (found) good++;
	}
	return good;
};

describe("3901. Good Subsequence Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countGoodSubseq([4, 8, 12, 16], 2, [
				[0, 3],
				[2, 6],
			]),
		).toBe(1);
		expect(
			countGoodSubseq([4, 5, 7, 8], 3, [
				[0, 6],
				[1, 9],
				[2, 3],
			]),
		).toBe(2);
		expect(
			countGoodSubseq([5, 7, 9], 2, [
				[1, 4],
				[2, 8],
			]),
		).toBe(0);
	});

	it("matches trying every subsequence on random updates", () => {
		const random = createRandom(3901);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 9), 1, 40);
			const p = random.int(1, 6);
			const queries = Array.from({ length: 6 }, () => [
				random.int(0, nums.length - 1),
				random.int(1, 40),
			]);
			expect(countGoodSubseq(nums, p, queries)).toBe(
				byBruteForce(nums, p, queries),
			);
		}
	});

	it("handles small arrays where every element is essential", () => {
		expect(countGoodSubseq([6, 10, 15], 1, [[0, 6]])).toBe(0);
		expect(countGoodSubseq([6, 10, 15, 1], 1, [[3, 1]])).toBe(1);
	});
});
