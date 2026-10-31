import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubstringsThatSatisfyKConstraintII as countKConstraintSubstrings } from ".";

/** Checks every substring of every query range. */
const byBruteForce = (s: string, k: number, queries: number[][]): number[] =>
	queries.map(([l = 0, r = 0]) => {
		let count = 0;
		for (let i = l; i <= r; i++) {
			let zeros = 0;
			let ones = 0;
			for (let j = i; j <= r; j++) {
				if (s[j] === "0") zeros++;
				else ones++;
				if (zeros <= k || ones <= k) count++;
			}
		}
		return count;
	});

describe("3261. Count Substrings That Satisfy K-Constraint II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countKConstraintSubstrings("0001111", 2, [[0, 6]])).toEqual([26]);
		expect(
			countKConstraintSubstrings("010101", 1, [
				[0, 5],
				[1, 4],
				[2, 3],
			]),
		).toEqual([15, 9, 3]);
	});

	it("matches checking every substring on random queries", () => {
		const random = createRandom(3261);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "01");
			const k = random.int(1, 3);
			const queries = Array.from({ length: 4 }, () => {
				const l = random.int(0, s.length - 1);
				return [l, random.int(l, s.length - 1)];
			});
			expect(countKConstraintSubstrings(s, k, queries)).toEqual(
				byBruteForce(s, k, queries),
			);
		}
	});
});
