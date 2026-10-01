import { describe, expect, it } from "bun:test";
import { uniquePaths } from ".";

/** Adds up the paths into each cell from above and from the left. */
const byDynamicProgramming = (m: number, n: number): number => {
	const row = new Array<number>(n).fill(1);
	for (let r = 1; r < m; r++) {
		for (let c = 1; c < n; c++) row[c] = (row[c] ?? 0) + (row[c - 1] ?? 0);
	}
	return row.at(-1) ?? 0;
};

describe("62. Unique Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniquePaths(3, 7)).toBe(28);
		expect(uniquePaths(3, 2)).toBe(3);
	});

	it("has one path along a single row or column", () => {
		expect(uniquePaths(1, 1)).toBe(1);
		expect(uniquePaths(1, 100)).toBe(1);
		expect(uniquePaths(100, 1)).toBe(1);
	});

	it("is symmetric in m and n", () => {
		expect(uniquePaths(7, 3)).toBe(28);
	});

	it("matches dynamic programming for every grid in the constraints with an answer up to 2 × 10^9", () => {
		for (let m = 1; m <= 100; m++) {
			for (let n = 1; n <= 100; n++) {
				const expected = byDynamicProgramming(m, n);
				if (expected > 2e9) break;
				expect(uniquePaths(m, n)).toBe(expected);
			}
		}
	});
});
