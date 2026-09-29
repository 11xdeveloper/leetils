import { describe, expect, it } from "bun:test";
import { DesignExcelSumFormula as Excel } from ".";

describe("631. Design Excel Sum Formula", () => {
	it("solves the example from the problem statement", () => {
		const excel = new Excel(3, "C");
		excel.set(1, "A", 2);
		expect(excel.sum(3, "C", ["A1", "A1:B2"])).toBe(4);
		excel.set(2, "B", 2);
		expect(excel.get(3, "C")).toBe(6);
	});

	it("follows chains of formulas and stops once a formula is overwritten", () => {
		const excel = new Excel(5, "E");
		excel.set(1, "A", 1);
		expect(excel.sum(1, "B", ["A1", "A1"])).toBe(2);
		expect(excel.sum(1, "C", ["A1:B1"])).toBe(3);
		excel.set(1, "A", 10);
		expect(excel.get(1, "B")).toBe(20);
		expect(excel.get(1, "C")).toBe(30);
		excel.set(1, "B", 5);
		excel.set(1, "A", 0);
		expect(excel.get(1, "C")).toBe(5);
		expect(excel.sum(1, "B", ["E5"])).toBe(0);
		expect(excel.get(1, "C")).toBe(0);
	});
});
