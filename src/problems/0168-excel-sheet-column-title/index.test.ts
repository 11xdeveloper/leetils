import { describe, expect, it } from "bun:test";
import { excelSheetColumnTitle } from ".";

describe("168. Excel Sheet Column Title", () => {
	it("solves the examples from the problem statement", () => {
		expect(excelSheetColumnTitle(1)).toBe("A");
		expect(excelSheetColumnTitle(28)).toBe("AB");
		expect(excelSheetColumnTitle(701)).toBe("ZY");
	});

	it("handles the boundaries between title lengths", () => {
		expect(excelSheetColumnTitle(26)).toBe("Z");
		expect(excelSheetColumnTitle(27)).toBe("AA");
		expect(excelSheetColumnTitle(702)).toBe("ZZ");
		expect(excelSheetColumnTitle(703)).toBe("AAA");
	});

	it("handles the largest 32-bit integer", () => {
		expect(excelSheetColumnTitle(2 ** 31 - 1)).toBe("FXSHRXW");
	});

	it("counts through titles in order", () => {
		const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		const expected = [
			...letters,
			...letters.flatMap((a) => letters.map((b) => a + b)),
		];
		for (const [i, title] of expected.entries()) {
			expect(excelSheetColumnTitle(i + 1)).toBe(title);
		}
	});
});
