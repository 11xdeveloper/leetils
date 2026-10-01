import { describe, expect, it } from "bun:test";
import { numberOfSetsOfKNonOverlappingLineSegments as numberOfSets } from ".";

/** Places segments left to right, each starting at or after the last one's end. */
const byBruteForce = (n: number, k: number): number => {
	const place = (from: number, left: number): number => {
		if (left === 0) return 1;
		let ways = 0;
		for (let start = from; start < n; start++) {
			for (let end = start + 1; end < n; end++) ways += place(end, left - 1);
		}
		return ways;
	};
	return place(0, k);
};

describe("1621. Number of Sets of K Non-Overlapping Line Segments", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSets(4, 2)).toBe(5);
		expect(numberOfSets(3, 1)).toBe(3);
		expect(numberOfSets(30, 7)).toBe(796297179);
	});

	it("matches placing segments directly for small inputs", () => {
		for (let n = 2; n <= 9; n++) {
			for (let k = 1; k < n; k++)
				expect(numberOfSets(n, k)).toBe(byBruteForce(n, k));
		}
	});
});
