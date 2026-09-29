import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { excelSheetColumnTitle } from "../0168-excel-sheet-column-title";
import { excelSheetColumnNumber } from ".";

describe("171. Excel Sheet Column Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(excelSheetColumnNumber("A")).toBe(1);
		expect(excelSheetColumnNumber("AB")).toBe(28);
		expect(excelSheetColumnNumber("ZY")).toBe(701);
	});

	it("handles the constraint's largest title", () => {
		expect(excelSheetColumnNumber("FXSHRXW")).toBe(2 ** 31 - 1);
	});

	it("round-trips with Excel Sheet Column Title", () => {
		for (let n = 1; n <= 20_000; n++) {
			expect(excelSheetColumnNumber(excelSheetColumnTitle(n))).toBe(n);
		}
		const random = createRandom(171);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 2 ** 31 - 1);
			expect(excelSheetColumnNumber(excelSheetColumnTitle(n))).toBe(n);
		}
	});
});
