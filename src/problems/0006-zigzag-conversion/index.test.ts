import { describe, expect, it } from "bun:test";
import { zigzagConversion } from ".";

/** Writes the zigzag out row by row, the way the problem describes it. */
const bySimulation = (s: string, numRows: number): string => {
	const rows: string[][] = Array.from({ length: numRows }, () => []);
	let row = 0;
	let step = numRows === 1 ? 0 : 1;
	for (const char of s) {
		rows[row]?.push(char);
		if (row + step < 0 || row + step >= numRows) step = -step;
		row += step;
	}
	return rows.flat().join("");
};

describe("6. Zigzag Conversion", () => {
	it("solves the examples from the problem statement", () => {
		expect(zigzagConversion("PAYPALISHIRING", 3)).toBe("PAHNAPLSIIGYIR");
		expect(zigzagConversion("PAYPALISHIRING", 4)).toBe("PINALSIGYAHRPI");
		expect(zigzagConversion("A", 1)).toBe("A");
	});

	it("returns the string unchanged for one row", () => {
		expect(zigzagConversion("ABCDEF", 1)).toBe("ABCDEF");
	});

	it("returns the string unchanged when there are at least as many rows as characters", () => {
		expect(zigzagConversion("ABC", 3)).toBe("ABC");
		expect(zigzagConversion("ABC", 1000)).toBe("ABC");
	});

	it("alternates characters for two rows", () => {
		expect(zigzagConversion("ABCDEF", 2)).toBe("ACEBDF");
	});

	it("keeps commas and periods, which the constraints allow", () => {
		expect(zigzagConversion("A,B.C", 2)).toBe("ABC,.");
	});

	it("matches writing out the zigzag for every row count", () => {
		const s = "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG.";
		for (let numRows = 1; numRows <= s.length + 1; numRows++) {
			expect(zigzagConversion(s, numRows)).toBe(bySimulation(s, numRows));
		}
	});
});
