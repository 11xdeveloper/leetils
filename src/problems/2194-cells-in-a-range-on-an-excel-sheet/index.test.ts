import { describe, expect, it } from "bun:test";
import { cellsInARangeOnAnExcelSheet as cellsInRange } from ".";

describe("2194. Cells in a Range on an Excel Sheet", () => {
	it("solves the examples from the problem statement", () => {
		expect(cellsInRange("K1:L2")).toEqual(["K1", "K2", "L1", "L2"]);
		expect(cellsInRange("A1:F1")).toEqual(["A1", "B1", "C1", "D1", "E1", "F1"]);
	});
});
