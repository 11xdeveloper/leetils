import { describe, expect, it } from "bun:test";
import { nQueens } from "../0051-n-queens";
import { nQueensII } from ".";

describe("52. N-Queens II", () => {
	it("solves the examples from the problem statement", () => {
		expect(nQueensII(4)).toBe(2);
		expect(nQueensII(1)).toBe(1);
	});

	it("finds no solutions for 2 and 3 queens", () => {
		expect(nQueensII(2)).toBe(0);
		expect(nQueensII(3)).toBe(0);
	});

	it("matches the number of boards from N-Queens, up to the constraint of 9 queens", () => {
		for (let n = 1; n <= 9; n++) {
			expect(nQueensII(n)).toBe(nQueens(n).length);
		}
	});

	it("handles larger boards", () => {
		// OEIS A000170.
		expect(nQueensII(10)).toBe(724);
		expect(nQueensII(12)).toBe(14200);
	});
});
